import React, { FC, useCallback } from 'react'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'
import { Alert } from 'react-native'
import { LatLng } from 'react-native-maps'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'

import { Historic } from '~/libs/realm/schemas/Historic'
import { getLastSyncTimestamp } from '~/libs/async-storage'
import { useObject, useRealm } from '~/libs/realm'
import { getStorageLocations } from '~/libs/async-storage/location-storage'

import { Header } from '~/components/Header'
import { Button } from '~/components/Button'
import { ButtonIcon } from '~/components/ButtonIcon'
import { Locations } from '~/components/Locations'
import { Loading } from '~/components/Loading'
import { Map, MapPlaceholder } from '~/components/Map'
import { LocationInfoProps } from '../Departure/components/LocationInfo'

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
import { stopLocationTask } from '~/tasks/background-location-task'

import { registerArrival } from '~/useCases/register-arrival'
import { getAddressLocation } from '~/useCases/get-address-location'

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

      await registerArrival(realm, historic, locations)
      await stopLocationTask()
      Alert.alert('Success', 'Vehicle arrival successfully registered.')
      goBack()
    } catch (e) {
      Alert.alert('Error', 'Fail to register vehicle arrival.')
    }
  }

  const title = historic?.status === 'DEPARTURE' ? 'Arrival' : 'Details'

  const getLocationInfo = useCallback(async () => {
    if (!historic?.updated_at) return
    let departure: LocationInfoProps = {} as LocationInfoProps
    let arrival: LocationInfoProps | null = null
    let coordinates: LatLng[] = []

    const lastSync = await getLastSyncTimestamp()
    const updatedAt = historic.updated_at.getTime()
    const itemIsSynced = (lastSync || 0) > (updatedAt || 0)

    if (historic?.status === 'DEPARTURE') {
      const storedLocations = await getStorageLocations()
      coordinates = storedLocations
    } else {
      const coords =
        historic?.coords?.map(({ latitude, longitude, timestamp }) => ({
          latitude,
          longitude,
          timestamp,
        })) || []
      coordinates = coords
    }

    if (historic?.coords[0]) {
      const departureLocation = await getAddressLocation(historic?.coords[0])
      departure = {
        label: `Departing from ${departureLocation.street ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format(
          'DD/MM/YYYY [at] HH:mm',
        ),
      }
    }

    if (historic?.status === 'ARRIVAL') {
      const lastCoord = historic.coords[historic.coords.length - 1]
      const arrivalLocation = await getAddressLocation(lastCoord)
      arrival = {
        label: `Arrival at ${arrivalLocation.street ?? ''}`,
        description: dayjs(new Date(lastCoord.timestamp)).format(
          'DD/MM/YYYY [at] HH:mm',
        ),
      }
    }
    return {
      departure,
      arrival,
      coordinates,
      itemIsSynced,
    }
  }, [historic])

  const { data, isLoading } = useQuery({
    queryKey: ['get-location-info', { item: historic?._id }],
    queryFn: getLocationInfo,
    staleTime: 0,
    enabled: !!historic?._id,
  })
  const departure = data?.departure || ({} as LocationInfoProps)
  const arrival = data?.arrival || null
  const coordinates = data?.coordinates || []
  const itemIsSynced = data?.itemIsSynced || false

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header title={title} />

      <MapPlaceholder>
        {!!coordinates.length && (
          <Map coordinates={coordinates} zoomControlEnabled />
        )}
      </MapPlaceholder>
      <Body>
        <Locations
          departure={departure}
          arrival={arrival}
          style={{ marginBottom: 32 }}
        />

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
