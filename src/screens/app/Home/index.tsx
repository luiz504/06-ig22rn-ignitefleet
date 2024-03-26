import React, { FC, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'

import { AppScreenProps } from '~/routes/app.routes'

import { useRealm, useQuery as useRealmQuery } from '~/libs/realm'
import { Historic } from '~/libs/realm/schemas/Historic'

import { Header } from './components/Header'
import { CarStatus } from './components/CarStatus'

import { Container, Body } from './styles'

type Props = AppScreenProps<'home'>
export const HomeScreen: FC<Props> = ({ navigation }) => {
  const historic = useRealmQuery(Historic)
  const realm = useRealm()

  const { data, mutateAsync: getVehicleInUsage } = useMutation({
    mutationFn: async () => {
      const vehicle = historic.filtered("status = 'departure'")[0]
      return vehicle || null
    },
  })

  const handleRegisterMovement = (vehicleId?: string) => {
    if (!vehicleId) {
      navigation.navigate('departure')
    } else {
      navigation.navigate('arrival', { id: vehicleId })
    }
  }

  useEffect(() => {
    getVehicleInUsage()
    realm.addListener('change', () => getVehicleInUsage())

    return () => {
      realm.removeListener('change', () => getVehicleInUsage())
    }
  }, [realm, getVehicleInUsage])

  return (
    <Container>
      <Header />

      <Body>
        <CarStatus
          licensePlate={data?.license_plate}
          onPress={() => handleRegisterMovement(data?._id?.toString())}
        />
      </Body>
    </Container>
  )
}
