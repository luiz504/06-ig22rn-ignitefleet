import { FC } from 'react'

import { Header } from '~/components/Header'
import { LicensePlateInput } from '~/screens/Departure/components/LicensePlateInput'
import { PurposeCard } from '~/screens/Departure/components/PurposeCard'

import { Container, Body } from './styles'
export const DepartureScreen: FC = () => {
  return (
    <Container>
      <Header title="Departure" />

      <Body>
        <LicensePlateInput label={'License Plate'} placeholder="BRA1234" />
        <PurposeCard label="Purpose" />
      </Body>
    </Container>
  )
}
