import { FC } from 'react'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'

import { Historic } from '~/libs/realm/schemas/Historic'
import { useObject } from '~/libs/realm'

import { Header } from '~/components/Header'
import { Button } from '~/components/Button'
import { ButtonIcon } from '~/components/ButtonIcon'
import { Body, Container, Label, LicensePlate, Purpose, Footer } from './styles'

import { AppScreenProps } from '~/routes/app.routes'

type Props = AppScreenProps<'arrival'>
export const Arrival: FC<Props> = ({ route: { params } }) => {
  const vehicleId = params.id

  const historic = useObject(
    Historic,
    new BSON.UUID(vehicleId) as unknown as string,
  )

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
        <ButtonIcon icon={X} />
        <Button label="Register Arrival" />
      </Footer>
    </Container>
  )
}
