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
  arrival?: LocationInfoProps | null
} & ComponentProps<typeof View>
export const Locations: FC<Props> = ({ departure, arrival, ...rest }) => {
  return (
    <Container {...rest}>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />
      {arrival && (
        <>
          <Line />
          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </Container>
  )
}
