import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useUser } from '@realm/react'
import {
  useForegroundPermissions,
  LocationSubscription,
  watchPositionAsync,
  LocationAccuracy,
  LocationObjectCoords,
} from 'expo-location'

import { getAddressLocation } from '~/useCases/get-address-location'
import { registerDeparture } from '~/useCases/register-departure'

import { processForegroundLocationPermission } from '~/utils/permissions/processForegroundLocationPermission'
import { licensePlateSchema } from '~/utils/validations/licensePlateValidation'
import { useRealm } from '~/libs/realm'

const departureFormSchema = z.object({
  licensePlate: licensePlateSchema,
  purpose: z
    .string({ required_error: 'Specify the purpose of vehicle use.' })
    .min(1, { message: 'Specify the purpose of vehicle use.' }),
})
type DepartureFormData = z.infer<typeof departureFormSchema>

export const useDepartureController = () => {
  const navigation = useNavigation()
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartureFormData>({
    mode: 'onChange',
    resolver: zodResolver(departureFormSchema),
    defaultValues: {
      licensePlate: 'ABD1234',
      purpose: 'Some Purpose',
    },
  })
  const [currentCoordinates, setCurrentCoordinates] =
    useState<LocationObjectCoords | null>(null)
  const realm = useRealm()
  const user = useUser()

  const handleRegisterDeparture = async (data: DepartureFormData) => {
    const result = await processForegroundLocationPermission()

    if (result !== 'GRANTED') return

    try {
      await registerDeparture(realm, {
        userId: user!.id,
        description: data.purpose,
        licensePlate: data.licensePlate,
      })

      Alert.alert('Success', 'Departure registered successfully')

      navigation.goBack()
    } catch (err) {
      Alert.alert('Error', 'Failed to register departure.')
    }
  }

  const [locationForegroundPermissions] = useForegroundPermissions()

  const {
    data: currentAddress = null,
    mutateAsync: _getAddressLocation,
    isPending,
  } = useMutation({
    mutationFn: async (coords: LocationObjectCoords) => {
      return await getAddressLocation(coords)
    },
  })

  useEffect(() => {
    if (!locationForegroundPermissions?.granted) return

    let subscription: LocationSubscription
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoordinates(location.coords)
        _getAddressLocation(location.coords)
      },
    ).then((response) => {
      subscription = response
    })

    return () => {
      subscription?.remove()
    }
  }, [locationForegroundPermissions, _getAddressLocation])

  return {
    control,
    setFocus,
    isSubmitting,
    errors,
    handleSubmit,
    handleRegisterDeparture,
    currentAddress,
    isPending,
    currentCoordinates,
  }
}
