import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'
import { useUser, useApp } from '@realm/react'

import { Container, Greeting, Message, Name, Picture } from './styles'

import { theme } from '~/theme'

export const Header: FC = () => {
  const profile = useUser().profile

  const app = useApp()

  const handleSignOut = async () => {
    await app.currentUser?.logOut()
  }
  return (
    <Container>
      <Picture
        source={{ uri: profile?.pictureUrl }}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      <Greeting>
        <Message>Hello!</Message>

        <Name>{profile?.name}</Name>
      </Greeting>
      <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
