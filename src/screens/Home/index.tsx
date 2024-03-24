import { FC } from 'react'

import { Header } from './components/Header'
import { CarStatus } from './components/CarStatus'

import { Container, Body } from './styles'

import { AppScreenProps } from '~/routes/app.routes'

type Props = AppScreenProps<'home'>
export const HomeScreen: FC<Props> = ({ navigation }) => {
  const handleRegisterMovement = () => {
    navigation.navigate('departure')
  }
  return (
    <Container>
      <Header />

      <Body>
        <CarStatus onPress={handleRegisterMovement} />
      </Body>
    </Container>
  )
}
