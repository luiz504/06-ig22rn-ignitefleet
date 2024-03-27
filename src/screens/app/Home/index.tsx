import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AppScreenProps } from '~/routes/app.routes'

import { useRealm, useQuery as useRealmQuery } from '~/libs/realm'
import { Historic } from '~/libs/realm/schemas/Historic'

import { Header } from './components/Header'
import { CarStatus } from './components/CarStatus'

import { Container, Body } from './styles'
import { HistoricCard } from '~/screens/app/Home/components/HistoricCard'

type Props = AppScreenProps<'home'>
export const HomeScreen: FC<Props> = ({ navigation }) => {
  const historic = useRealmQuery(Historic)
  const realm = useRealm()

  const { data: vehicleInUse, refetch: refetchVehicleInUse } = useQuery({
    queryKey: ['vehicle-in-usage'],
    queryFn: async () => {
      const vehicle = historic.filtered("status = 'departure'")[0]
      return vehicle || null
    },
    staleTime: 0,
  })

  const { data: vehiclesHistoric, refetch: refetchVehicleHistoric } = useQuery({
    queryKey: ['vehicle-historic'],
    queryFn: async () => {
      const vehicles = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )
      return vehicles
    },
    staleTime: 0,
  })

  const handleRegisterMovement = (vehicleId?: string) => {
    if (!vehicleId) {
      navigation.navigate('departure')
    } else {
      navigation.navigate('arrival', { id: vehicleId })
    }
  }

  useEffect(() => {
    const update = () => {
      refetchVehicleInUse()
      refetchVehicleHistoric()
    }
    realm.addListener('change', update)

    return () => {
      realm.removeListener('change', update)
    }
  }, [realm, refetchVehicleInUse, refetchVehicleHistoric])

  return (
    <Container>
      <Header />

      <Body>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={() => handleRegisterMovement(vehicleInUse?._id?.toString())}
        />

        <HistoricCard
          data={{
            createdAt: '20/04',
            licensePlate: 'XXX2A12',
            isSynced: false,
          }}
        />
        <HistoricCard
          data={{
            createdAt: '20/04',
            licensePlate: 'XXX2A12',
            isSynced: true,
          }}
        />
      </Body>
    </Container>
  )
}
