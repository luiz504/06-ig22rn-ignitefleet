import styled, { css } from 'styled-components/native'

export type Size = 'SMALL' | 'NORMAL'

const sizeVariants: Record<Size, ReturnType<typeof css>> = {
  SMALL: css`
    width: 32px;
    height: 32px;
  `,
  NORMAL: css`
    width: 46px;
    height: 46px;
  `,
}

export const Container = styled.View<{ size: Size }>`
  ${(props) => sizeVariants[props.size]}

  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  justify-content: center;
  align-items: center;
`
