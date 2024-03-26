import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { IconProps } from 'phosphor-react-native'

import { Container } from './styles'

type Props = TouchableOpacityProps & {
  icon: (props: IconProps) => JSX.Element
}
export const ButtonIcon: FC<Props> = ({ icon: Icon, ...rest }) => {
  const theme = useTheme()
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon size={24} color={theme.COLORS.BRAND_MID} />
    </Container>
  )
}
