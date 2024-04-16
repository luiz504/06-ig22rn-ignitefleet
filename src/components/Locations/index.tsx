import React, { ComponentProps, FC } from 'react'

import { Container, Line } from './styles'
import {
  LocationInfo,
  LocationInfoProps,
} from '~/screens/app/Departure/components/LocationInfo'
import { Car, FlagCheckered } from 'phosphor-react-native'
import { View } from 'react-native'

type Props = {
  departure: LocationInfoProps
  arrival: LocationInfoProps
} & ComponentProps<typeof View>
export const Locations: FC<Props> = ({ departure, arrival, ...rest }) => {
  return (
    <Container {...rest}>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />
      <Line />
      <LocationInfo
        icon={FlagCheckered}
        label={arrival.label}
        description={arrival.description}
      />
    </Container>
  )
}
