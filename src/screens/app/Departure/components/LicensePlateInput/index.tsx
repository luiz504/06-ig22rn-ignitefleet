import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Label, styles } from './styles'

type Props = { label: string } & TextInputProps

export const LicensePlateInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    const theme = useTheme()
    return (
      <Container>
        <Label> {label} </Label>

        <TextInput
          {...rest}
          ref={ref}
          style={[styles.input, rest.style]}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={theme.COLORS.GRAY_400}
        />
      </Container>
    )
  },
)
LicensePlateInput.displayName = 'LicensePlateInput'
