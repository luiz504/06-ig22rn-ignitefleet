import React, { FC } from 'react'
import BgImage from '~/assets/background.png'
import { Container, Title, Slogan } from './styles'

export const SignIn: FC = () => {
  return (
    <Container source={BgImage}>
      <Title> SignIn </Title>
      <Slogan>Gestão de uso de veículos</Slogan>
    </Container>
  )
}
