import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'

import { Container, Label, styles } from './styles'

type Props = TextInputProps & {
  label: string
}
export const PurposeCard = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    const theme = useTheme()

    return (
      <Container>
        <Label>{label}</Label>
        <TextInput
          {...rest}
          ref={ref}
          placeholderTextColor={theme.COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          style={[styles.input, rest.style]}
        />
      </Container>
    )
  },
)

PurposeCard.displayName = 'PurposeCard'
