import { FC } from 'react'

import { Container, Title } from './styles'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  icon?: (props: IconProps) => JSX.Element
  title: string
}
export const TopMessage: FC<Props> = ({ icon: Icon, title }) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 5
  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={theme.COLORS.GRAY_100} />}
      <Title>{title}</Title>
    </Container>
  )
}
