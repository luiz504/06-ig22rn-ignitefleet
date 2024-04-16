import React, { FC, useCallback, useEffect, useState } from 'react'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'
import { Alert } from 'react-native'

import { Historic } from '~/libs/realm/schemas/Historic'
import { useObject, useRealm } from '~/libs/realm'

import { Header } from '~/components/Header'
import { Button } from '~/components/Button'
import { ButtonIcon } from '~/components/ButtonIcon'
import {
  Body,
  Container,
  Label,
  LicensePlate,
  Purpose,
  Footer,
  AsyncMessage,
} from './styles'

import { AppScreenProps } from '~/routes/app.routes'
import { getLastSyncTimestamp } from '~/libs/async-storage'
import { stopLocationTask } from '~/tasks/background-location-task'
import { getStorageLocations } from '~/libs/async-storage/location-storage'
import { LatLng } from 'react-native-maps'
import { Map, MapPlaceholder } from '~/components/Map'
import { registerArrival } from '~/useCases/register-arrival'

type Props = AppScreenProps<'arrival'>
export const Arrival: FC<Props> = ({
  route: { params },
  navigation: { goBack },
}) => {
  const vehicleId = params.id

  const historic = useObject(
    Historic,
    new BSON.UUID(vehicleId) as unknown as string,
  )
  const realm = useRealm()
  const registerUsageCancel = async () => {
    realm.write(() => {
      realm.delete(historic)
    })
    await stopLocationTask()

    goBack()
  }
  const handleCancelVehicleUsage = () => {
    Alert.alert(
      'Cancel Vehicle Usage',
      'Do you want to cancel the vehicle usage?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => registerUsageCancel() },
      ],
    )
  }

  const handleVehicleArrival = async () => {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          "Was't possible to get vehicle data to register the arrival.",
        )
      }
      const locations = await getStorageLocations()
      console.log(locations)
      await registerArrival(realm, historic, locations)
      await stopLocationTask()
      Alert.alert('Success', 'Vehicle arrival successfully registered.')
      goBack()
    } catch (e) {
      Alert.alert('Error', 'Fail to register vehicle arrival.')
    }
  }

  const title = historic?.status === 'DEPARTURE' ? 'Arrival' : 'Details'

  const [itemIsSynced, setItemIsSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const getLocationInfo = useCallback(async () => {
    if (!historic?.updated_at) return
    const lastSync = await getLastSyncTimestamp()
    const updatedAt = historic.updated_at.getTime()
    setItemIsSynced((lastSync || 0) > (updatedAt || 0))

    const storedLocations = await getStorageLocations()
    setCoordinates(storedLocations)
  }, [historic?.updated_at])

  useEffect(() => {
    getLocationInfo()
  }, [getLocationInfo])

  return (
    <Container>
      <Header title={title} />

      <MapPlaceholder>
        {!!coordinates.length && (
          <Map coordinates={coordinates} zoomControlEnabled />
        )}
      </MapPlaceholder>
      <Body>
        <Label>License plate</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Purpose</Label>
        <Purpose>{historic?.description}</Purpose>
      </Body>

      {historic?.status === 'DEPARTURE' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleCancelVehicleUsage} />

          <Button label="Register Arrival" onPress={handleVehicleArrival} />
        </Footer>
      )}

      {!itemIsSynced && (
        <AsyncMessage>
          Synchronization of{' '}
          {historic?.status === 'DEPARTURE' ? 'departure' : 'arrival'} pending.
        </AsyncMessage>
      )}
    </Container>
  )
}
