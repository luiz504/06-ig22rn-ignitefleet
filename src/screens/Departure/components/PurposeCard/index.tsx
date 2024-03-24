import React, { FC } from 'react'

import { Container, Input, Label } from './styles'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'

type Props = TextInputProps & {
  label: string
}
export const PurposeCard: FC<Props> = ({ label, ...rest }) => {
  const theme = useTheme()
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        {...rest}
        placeholderTextColor={theme.COLORS.GRAY_400}
        multiline
        autoCapitalize="sentences"
        style={{ textAlignVertical: 'top', ...(rest.style as object) }}
      />
    </Container>
  )
}
