import React, { FC, useEffect } from 'react'
import { Alert, FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { AppScreenProps } from '~/routes/app.routes'

import { useRealm, useQuery as useRealmQuery } from '~/libs/realm'
import { HISTORIC_STATUS, Historic } from '~/libs/realm/schemas/Historic'

import { Header } from './components/Header'
import { VehicleStatus } from './components/VehicleStatus'

import { Container, Body, Title, EmptyFeedback } from './styles'
import {
  HistoricCard,
  HistoricCardDataType,
} from '~/screens/app/Home/components/HistoricCard'

type Props = AppScreenProps<'home'>
export const HomeScreen: FC<Props> = ({ navigation: { navigate } }) => {
  const historic = useRealmQuery(Historic)
  const realm = useRealm()

  const { data: vehicleInUse, refetch: refetchVehicleInUse } = useQuery({
    queryKey: ['vehicle-in-usage'],
    queryFn: async () => {
      const vehicle = historic.filtered(
        `status = '${HISTORIC_STATUS.DEPARTURE}'`,
      )[0]
      return vehicle || null
    },
    staleTime: 0,
  })

  const { data: vehiclesHistoric, refetch: refetchVehicleHistoric } = useQuery({
    queryKey: ['vehicle-historic'],
    queryFn: async () => {
      try {
        const histories = historic.filtered(
          `status = '${HISTORIC_STATUS.ARRIVAL}' SORT(created_at DESC)`,
        )
        const formatted = histories.map(
          (item) =>
            ({
              id: item._id.toString(),
              licensePlate: item.license_plate,
              createdAt: dayjs(item.created_at).format(
                '[Departure on] DD/MM/YYYY [at] HH:mm',
              ),
              isSynced: false,
            }) satisfies HistoricCardDataType,
        )
        return formatted
      } catch (e) {
        Alert.alert('Error', 'Fail to get vehicle historic data.')
        throw e
      }
    },
    staleTime: 0,
    retry: false,
  })

  const handleRegisterMovement = (vehicleId?: string) => {
    if (!vehicleId) {
      navigate('departure')
    } else {
      navigate('arrival', { id: vehicleId })
    }
  }
  const handleHistoricDetails = (id: string) => {
    navigate('arrival', { id })
  }
  useEffect(() => {
    const update = () => {
      refetchVehicleInUse()
      refetchVehicleHistoric()
    }
    realm.addListener('change', update)

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', update)
      }
    }
  }, [realm, refetchVehicleInUse, refetchVehicleHistoric])

  return (
    <Container>
      <Header />

      <Body>
        <VehicleStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={() => handleRegisterMovement(vehicleInUse?._id?.toString())}
        />

        <Title>Historic</Title>

        <FlatList
          data={vehiclesHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <EmptyFeedback>No vehicle usage yet</EmptyFeedback>
          )}
        />
      </Body>
    </Container>
  )
}
