import { FC } from 'react'

import { Header } from './components/Header'
import { CarStatus } from './components/CarStatus'

import { Container, Body } from './styles'
export const Home: FC = () => {
  return (
    <Container>
      <Header />

      <Body>
        <CarStatus />
        <CarStatus licensePlate={'ABC-1234'} />
      </Body>
    </Container>
  )
}
