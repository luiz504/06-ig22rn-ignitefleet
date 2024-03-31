import React, { FC, useEffect } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@realm/react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation } from '@tanstack/react-query'

import { useRealm } from '~/libs/realm'

import { licensePlateSchema } from '~/utils/validations/licensePlateValidation'

import { LicensePlateInput } from '~/screens/app/Departure/components/LicensePlateInput'
import { PurposeCard } from '~/screens/app/Departure/components/PurposeCard'
import { Button } from '~/components/Button'
import { Header } from '~/components/Header'
import { FormFieldColumn, TextError } from '~/components/form'
import { Loading } from '~/components/Button/styled'
import { LocationInfo } from './components/LocationInfo'

import { Container, Body } from './styles'

import { AppScreenProps } from '~/routes/app.routes'
import { processForegroundLocationPermission } from '~/utils/permissions/processForegroundLocationPermission'

import { registerDeparture } from '~/useCases/register-departure'
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
} from 'expo-location'
import { getAddressLocation } from '~/useCases/get-address-location'
import { Car } from 'phosphor-react-native'

const departureFormSchema = z.object({
  licensePlate: licensePlateSchema,
  purpose: z
    .string({ required_error: 'Specify the purpose of vehicle use.' })
    .min(1, { message: 'Specify the purpose of vehicle use.' }),
})
type DepartureFormData = z.infer<typeof departureFormSchema>

type Props = AppScreenProps<'departure'>
export const DepartureScreen: FC<Props> = ({ navigation }) => {
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
      (location) => _getAddressLocation(location.coords),
    ).then((response) => {
      subscription = response
    })

    return () => {
      subscription?.remove()
    }
  }, [locationForegroundPermissions, _getAddressLocation])

  return (
    <Container>
      <Header title="Departure" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Body>
            {currentAddress && (
              <LocationInfo
                icon={Car}
                label="Current Address"
                description={currentAddress?.street || ''}
              />
            )}
            <FormFieldColumn>
              <Controller
                control={control}
                name="licensePlate"
                render={({ field: { ref, value, onChange, disabled } }) => (
                  <LicensePlateInput
                    label={'License Plate'}
                    placeholder="BRA1234"
                    onSubmitEditing={() => setFocus('purpose')}
                    returnKeyType="next"
                    ref={ref}
                    value={value}
                    onChangeText={(value) =>
                      onChange(value.toLocaleUpperCase().trim())
                    }
                    editable={!disabled && !isSubmitting}
                  />
                )}
              />
              <TextError error={errors.licensePlate?.message} />
            </FormFieldColumn>
            <FormFieldColumn>
              <Controller
                control={control}
                name="purpose"
                render={({ field: { ref, value, onChange, disabled } }) => (
                  <PurposeCard
                    label="Purpose"
                    onSubmitEditing={handleSubmit(handleRegisterDeparture)}
                    returnKeyType="send"
                    blurOnSubmit
                    ref={ref}
                    value={value}
                    onChangeText={(value) => onChange(value.trim())}
                    editable={!disabled && !isSubmitting}
                  />
                )}
              />
              <TextError error={errors.purpose?.message} />
            </FormFieldColumn>

            <Button
              label="Register Departure"
              onPress={handleSubmit(handleRegisterDeparture)}
              isLoading={isSubmitting}
            />
          </Body>
        </ScrollView>
      </KeyboardAwareScrollView>

      {isPending && (
        <Loading
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 12, 20, 0.5)',
          }}
        />
      )}
    </Container>
  )
}
