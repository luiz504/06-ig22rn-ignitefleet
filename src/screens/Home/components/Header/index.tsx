import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'

import { Container, Greeting, Message, Name, Picture } from './styles'

import { theme } from '~/theme'

export const Header: FC = () => {
  return (
    <Container>
      <Picture
        source={{ uri: 'https://github.com/luiz504.png' }}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      <Greeting>
        <Message>Hello,</Message>

        <Name>Luiz Bueno</Name>
      </Greeting>
      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
