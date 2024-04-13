import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`
export const Message = styled.Text`
  color: ${({ theme }) => theme.COLORS.WARNING_500};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const Button = styled.TouchableOpacity`
  margin-top: 32px;
`
export const ButtonLabel = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
