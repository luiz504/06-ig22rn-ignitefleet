import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useUser } from '@realm/react'
import * as Linking from 'expo-linking'
import {
  useForegroundPermissions,
  LocationSubscription,
  watchPositionAsync,
  LocationAccuracy,
  LocationObjectCoords,
} from 'expo-location'
import { LatLng } from 'react-native-maps'

import { getAddressLocation } from '~/useCases/get-address-location'
import { registerDeparture } from '~/useCases/register-departure'

import { licensePlateSchema } from '~/utils/validations/licensePlateValidation'
import { useRealm } from '~/libs/realm'
import { processBackgroundLocationPermission } from '~/utils/permissions/processBackgroundLocationPermission'
import { startLocationTask } from '~/tasks/background-location-task'

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

  const processDeparture = async (data: DepartureFormData, coords: LatLng) => {
    try {
      await startLocationTask()
      await registerDeparture(realm, {
        userId: user!.id,
        description: data.purpose,
        licensePlate: data.licensePlate,
        coords: [
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp: new Date().getTime(),
          },
        ],
      })

      Alert.alert('Success', 'Departure registered successfully')

      navigation.goBack()
    } catch (err) {
      Alert.alert('Error', 'Failed to register departure.')
    }
  }
  const handleRegisterDeparture = async (data: DepartureFormData) => {
    if (!currentCoordinates?.latitude && !currentCoordinates?.longitude) {
      return Alert.alert('Error', 'Location not found.')
    }
    const permission = await processBackgroundLocationPermission()

    if (permission === 'GRANTED') {
      processDeparture(data, {
        latitude: currentCoordinates.latitude,
        longitude: currentCoordinates.longitude,
      })
    }
  }

  const [locationForegroundPermissions, requestPermission] =
    useForegroundPermissions()

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
    if (
      !locationForegroundPermissions?.granted &&
      locationForegroundPermissions?.canAskAgain
    ) {
      requestPermission()
    }
  }, [locationForegroundPermissions, requestPermission])

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

  const showRequiredPermissionMessage =
    locationForegroundPermissions &&
    !locationForegroundPermissions.granted &&
    !locationForegroundPermissions.canAskAgain

  const handleOpenAppSettings = async () => {
    await Linking.openSettings()
  }

  return {
    control,
    setFocus,
    isSubmitting,
    errors,
    handleSubmit,
    handleRegisterDeparture,
    handleOpenAppSettings,
    currentAddress,
    isPending,
    currentCoordinates,
    showRequiredPermissionMessage,
  }
}
