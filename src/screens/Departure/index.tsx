import React, { FC } from 'react'

import { Container } from './styles'
import { Header } from '~/components/Header'

export const DepartureScreen: FC = () => {
  return (
    <Container>
      <Header title="Departure" />
    </Container>
  )
}
