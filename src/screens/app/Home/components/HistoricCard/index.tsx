import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Check, ClockClockwise } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Container, Departure, Info, LicensePlate } from './styles'

type HistoricCardProps = {
  licensePlate: string
  createdAt: string
  isSynced: boolean
}

type Props = TouchableOpacityProps & {
  data: HistoricCardProps
}
export const HistoricCard: FC<Props> = ({ data, ...rest }) => {
  const theme = useTheme()
  return (
    <Container {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.createdAt}</Departure>
      </Info>

      {data.isSynced ? (
        <Check size={24} color={theme.COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={theme.COLORS.GRAY_400} />
      )}
    </Container>
  )
}
