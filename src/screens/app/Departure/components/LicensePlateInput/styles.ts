import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '~/theme'

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`
export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
export const styles = StyleSheet.create({
  input: {
    color: theme.COLORS.GRAY_200,
    fontSize: theme.FONT_SIZE.XXL,
    fontFamily: theme.FONT_FAMILY.BOLD,

    textAlign: 'center',
    marginTop: 16,
  },
})
