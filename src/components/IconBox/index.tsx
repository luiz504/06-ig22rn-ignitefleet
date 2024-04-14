import { ComponentProps, FC } from 'react'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Container, Size } from './styles'
export type IconBoxProps = (props: IconProps) => JSX.Element
type Props = {
  size?: Size
  icon: IconBoxProps
} & Omit<ComponentProps<typeof Container>, 'size'>
export const IconBox: FC<Props> = ({
  size = 'NORMAL',
  icon: Icon,
  ...rest
}) => {
  const theme = useTheme()
  const iconSize = size === 'NORMAL' ? 24 : 16
  return (
    <Container size={size} {...rest}>
      <Icon size={iconSize} color={theme.COLORS.BRAND_LIGHT} />
    </Container>
  )
}
