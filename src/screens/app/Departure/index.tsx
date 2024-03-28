import React, { FC } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@realm/react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useRealm } from '~/libs/realm'
import { Historic } from '~/libs/realm/schemas/Historic'
import { licensePlateSchema } from '~/utils/validations/licensePlateValidation'

import { LicensePlateInput } from '~/screens/app/Departure/components/LicensePlateInput'
import { PurposeCard } from '~/screens/app/Departure/components/PurposeCard'
import { Button } from '~/components/Button'
import { Header } from '~/components/Header'
import { FormFieldColumn, TextError } from '~/components/form'

import { Container, Body } from './styles'

import { AppScreenProps } from '~/routes/app.routes'

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

  const handleDepartureRegister = handleSubmit(
    async (data: DepartureFormData) => {
      try {
        realm.write(() => {
          realm.create(
            'Historic',
            Historic.generate({
              user_id: user!.id,
              license_plate: data.licensePlate,
              description: data.purpose,
            }),
          )
        })

        Alert.alert('Success', 'Departure registered successfully')

        navigation.goBack()
      } catch (err) {
        Alert.alert('Error', 'Failed to register departure.')
      }
    },
  )
  return (
    <Container>
      <Header title="Departure" />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Body>
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
                    onSubmitEditing={handleDepartureRegister}
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
              onPress={handleDepartureRegister}
              isLoading={isSubmitting}
            />
          </Body>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
