import React, { FC } from 'react'
import { Car, Key } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Container, IconBox, Message, TextHighLight } from './styles'

type Props = {
  licensePlate?: string | null
}
export const CarStatus: FC<Props> = ({ licensePlate = null }) => {
  const theme = useTheme()
  const Icon = licensePlate ? Car : Key
  const message = licensePlate
    ? `${licensePlate} vehicle in use. `
    : 'No vehicle in use.'

  const status = licensePlate ? 'arrival' : 'departure'
  const textHightLight = {
    arrival: `Click here to register an arrival`,
    departure: `Click here to register a departure`,
  }
  return (
    <Container>
      <IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>
      <Message>
        {message}
        <TextHighLight> {textHightLight[status]}</TextHighLight>
      </Message>
    </Container>
  )
}
