import { ComponentProps, FC } from 'react'

import { Container, Message, Button, ButtonLabel } from './styles'
import { View } from 'react-native'

type Props = ComponentProps<typeof View> & {
  title: string
  btnLabel?: string
  onPress?: () => void
}
export const OpenSettingsFB: FC<Props> = ({
  title,
  btnLabel = 'Open Settings',
  onPress,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Message>{title}</Message>
      <Button onPress={onPress}>
        <ButtonLabel>{btnLabel}</ButtonLabel>
      </Button>
    </Container>
  )
}
