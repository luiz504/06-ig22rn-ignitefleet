import { FC } from 'react'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'
import { Alert } from 'react-native'

import { Historic } from '~/libs/realm/schemas/Historic'
import { useObject, useRealm } from '~/libs/realm'

import { Header } from '~/components/Header'
import { Button } from '~/components/Button'
import { ButtonIcon } from '~/components/ButtonIcon'
import { Body, Container, Label, LicensePlate, Purpose, Footer } from './styles'

import { AppScreenProps } from '~/routes/app.routes'

type Props = AppScreenProps<'arrival'>
export const Arrival: FC<Props> = ({
  route: { params },
  navigation: { goBack },
}) => {
  const vehicleId = params.id

  const historic = useObject(
    Historic,
    new BSON.UUID(vehicleId) as unknown as string,
  )
  const realm = useRealm()
  const registerUsageCancel = async () => {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }
  const handleCancelVehicleUsage = () => {
    Alert.alert(
      'Cancel Vehicle Usage',
      'Do you want to cancel the vehicle usage?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => registerUsageCancel() },
      ],
    )
  }

  const handleVehicleArrival = () => {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          "Was't possible to get vehicle data to register the arrival.",
        )
      }
      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })
      Alert.alert('Success', 'Vehicle arrival successfully registered.')
      goBack()
    } catch (e) {
      Alert.alert('Error', 'Fail to register vehicle arrival.')
    }
  }

  return (
    <Container>
      <Header title="Arrival" />

      <Body>
        <Label>License plate</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Purpose</Label>
        <Purpose>{historic?.description}</Purpose>
      </Body>
      <Footer>
        <ButtonIcon icon={X} onPress={handleCancelVehicleUsage} />

        <Button label="Register Arrival" onPress={handleVehicleArrival} />
      </Footer>
    </Container>
  )
}
