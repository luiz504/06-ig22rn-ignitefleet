import React, { ComponentPropsWithoutRef, FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Label, Loading } from './styled'

type Props = ComponentPropsWithoutRef<typeof TouchableOpacity> & {
  label: string
  isLoading?: boolean
}
export const Button: FC<Props> = ({
  label,
  isLoading = false,
  disabled,
  ...rest
}) => {
  return (
    <Container {...rest} activeOpacity={0.7} disabled={isLoading || disabled}>
      {isLoading ? <Loading /> : <Label>{label}</Label>}
    </Container>
  )
}
