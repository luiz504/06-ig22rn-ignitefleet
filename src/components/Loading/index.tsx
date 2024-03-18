import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import { ComponentPropsWithoutRef, FC } from 'react'

import { Container, LoadingIndicator } from './styles'

type Props = ComponentPropsWithoutRef<typeof ActivityIndicator> & {
  containerStyle?: StyleProp<ViewStyle>
}

export const Loading: FC<Props> = ({ containerStyle, ...rest }) => {
  return (
    <Container style={containerStyle}>
      <LoadingIndicator {...rest} />
    </Container>
  )
}
