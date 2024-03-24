import { FC } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { LicensePlateInput } from '~/screens/Departure/components/LicensePlateInput'
import { PurposeCard } from '~/screens/Departure/components/PurposeCard'
import { Button } from '~/components/Button'
import { Header } from '~/components/Header'
import { FormFieldColumn, TextError } from '~/components/form'

import { Container, Body } from './styles'
import { licensePlateSchema } from '~/utils/validations/licensePlateValidation'

const KeyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

const departureFormSchema = z.object({
  licensePlate: licensePlateSchema,
  purpose: z
    .string({ required_error: 'Inform the purpose of vehicle usage' })
    .min(1, { message: 'Inform the purpose of vehicle usage.' }),
})
type DepartureFormData = z.infer<typeof departureFormSchema>
export const DepartureScreen: FC = () => {
  const {
    control,
    setFocus,
    trigger,
    formState: { errors },
  } = useForm<DepartureFormData>({
    resolver: zodResolver(departureFormSchema),
  })

  const handleDepartureRegister = async () => {
    const isValid = await trigger(['licensePlate', 'purpose'], {
      shouldFocus: true,
    })

    console.log('OK', isValid) //eslint-disable-line
  }
  return (
    <Container>
      <Header title="Departure" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={KeyboardAvoidingViewBehavior}
      >
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
                    editable={!disabled}
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
                    editable={!disabled}
                  />
                )}
              />
              <TextError error={errors.purpose?.message} />
            </FormFieldColumn>

            <Button
              label="Register Departure"
              onPress={handleDepartureRegister}
            />
          </Body>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}
