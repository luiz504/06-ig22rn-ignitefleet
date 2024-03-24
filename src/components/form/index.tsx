import { FC } from 'react'
import styled from 'styled-components/native'

export const FormFieldColumn = styled.View`
  gap: 4px;
`

export const Error = styled.Text`
  color: ${({ theme }) => theme.COLORS.ERROR_500};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-left: 4px;
`

type Props = {
  error?: string
}
export const TextError: FC<Props> = ({ error }) => {
  return <>{error && <Error>{error}</Error>}</>
}
