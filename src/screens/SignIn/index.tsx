import React, { FC } from 'react'
import BgImage from '~/assets/background.png'

import { Button } from '~/components/Button'

import { Container, Title, Slogan } from './styles'
export const SignIn: FC = () => {
  return (
    <Container source={BgImage}>
      <Title> Ignite Fleet </Title>
      <Slogan>Vehicle usage management</Slogan>
      <Button label="Login with Google" />
    </Container>
  )
}
