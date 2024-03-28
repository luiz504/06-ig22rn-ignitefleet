import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 20px 16px;
  border-radius: 6px;
  margin-bottom: 12px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const Info = styled.View`
  flex: 1;
`
export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`
export const Departure = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  margin-bottom: 4px;
`
