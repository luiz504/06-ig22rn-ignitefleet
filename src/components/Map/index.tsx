import { Car } from 'phosphor-react-native'
import { FC } from 'react'
import MapView, {
  LatLng,
  MapViewProps,
  PROVIDER_GOOGLE,
  Marker,
} from 'react-native-maps'

import { IconBox } from '~/components/IconBox'

type Props = MapViewProps & {
  coordinates: LatLng[]
}
export const Map: FC<Props> = ({ coordinates, ...rest }) => {
  const lastCoordinate = coordinates[coordinates.length - 1]

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.latitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      {...rest}
    >
      <Marker coordinate={coordinates[0]}>
        <IconBox size="SMALL" icon={Car} />
      </Marker>
    </MapView>
  )
}
