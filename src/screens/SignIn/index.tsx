import { FC } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'

import BgImage from '~/assets/background.png'

import { Button } from '~/components/Button'

import { Container, Title, Slogan } from './styles'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'
import { useApp, Realm } from '@realm/react'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})
export const SignIn: FC = () => {
  const app = useApp()
  const { mutateAsync: handleGoogleSignIn, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { idToken } = await GoogleSignin.signIn()
        if (!idToken) {
          throw new Error('Failed to login with Google account')
        }

        const credentials = Realm.Credentials.jwt(idToken)
        await app.logIn(credentials)
      } catch (err) {
        Alert.alert(
          'Login',
          "It wasn't possible to login with your Google account.",
        )
        throw err
      }
    },
  })
  return (
    <Container source={BgImage}>
      <Title> Ignite Fleet </Title>
      <Slogan>Vehicle usage management</Slogan>
      <Button
        label="Login with Google"
        onPress={() => handleGoogleSignIn()}
        isLoading={isPending}
      />
    </Container>
  )
}
