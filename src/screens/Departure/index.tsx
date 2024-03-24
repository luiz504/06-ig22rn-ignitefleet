import { FC, useRef } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native'

import { LicensePlateInput } from '~/screens/Departure/components/LicensePlateInput'
import { PurposeCard } from '~/screens/Departure/components/PurposeCard'
import { Button } from '~/components/Button'
import { Header } from '~/components/Header'

import { Container, Body } from './styles'
const KeyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'
export const DepartureScreen: FC = () => {
  const purposeRef = useRef<TextInput>(null)

  const handleDepartureRegister = () => {
    console.log('OK') //eslint-disable-line
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
            <LicensePlateInput
              label={'License Plate'}
              placeholder="BRA1234"
              onSubmitEditing={() => purposeRef.current?.focus()}
              returnKeyType="next"
            />
            <PurposeCard
              label="Purpose"
              ref={purposeRef}
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
            />

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
