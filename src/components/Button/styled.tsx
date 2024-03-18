import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};

  max-height: 56px;
  height: 56px;
  border-radius: 6px;
  padding: 8px 16px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`
export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``
