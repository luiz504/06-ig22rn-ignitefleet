import { FC } from 'react'

import { Container, Label, Input } from './styles'
import { useTheme } from 'styled-components/native'
import { TextInputProps } from 'react-native'

type Props = { label: string } & TextInputProps
export const LicensePlateInput: FC<Props> = ({ label, ...rest }) => {
  const theme = useTheme()
  return (
    <Container>
      <Label> {label} </Label>

      <Input
        {...rest}
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={theme.COLORS.GRAY_400}
      />
    </Container>
  )
}
