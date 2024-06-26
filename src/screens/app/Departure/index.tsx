import { FC } from 'react'
import { ScrollView } from 'react-native'
import { Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Car } from 'phosphor-react-native'

import { Button } from '~/components/Button'
import { Header } from '~/components/Header'
import { Map, MapPlaceholder } from '~/components/Map'
import { OpenSettingsFB } from '~/components/feedbacks/OpenSettingsFB'
import { FormFieldColumn, TextError } from '~/components/form'
import { LocationInfo } from './components/LocationInfo'
import { LicensePlateInput } from './components/LicensePlateInput'
import { PurposeCard } from './components/PurposeCard'

import { Container, Body } from './styles'

import { useDepartureController } from './controller'

export const DepartureScreen: FC = () => {
  const {
    control,
    setFocus,
    isSubmitting,
    errors,
    handleSubmit,
    handleRegisterDeparture,
    currentAddress,
    isPending,
    currentCoordinates,
    showRequiredPermissionMessage,
    handleOpenAppSettings,
  } = useDepartureController()
  const disabledDeparture = isSubmitting || isPending || !currentCoordinates
  return (
    <Container>
      <Header title="Departure" />

      <KeyboardAwareScrollView
        extraHeight={100}
        contentContainerStyle={{ flex: 1 }}
      >
        {showRequiredPermissionMessage && (
          <OpenSettingsFB
            title="Location permission required."
            onPress={() => handleOpenAppSettings()}
          />
        )}
        {!showRequiredPermissionMessage && (
          <ScrollView>
            <MapPlaceholder>
              {!!currentCoordinates && (
                <Map coordinates={[currentCoordinates]} zoomControlEnabled />
              )}
            </MapPlaceholder>
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
                isLoading={disabledDeparture}
              />
            </Body>
          </ScrollView>
        )}
      </KeyboardAwareScrollView>
    </Container>
  )
}
