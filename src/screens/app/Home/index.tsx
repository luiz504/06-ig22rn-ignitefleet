import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert } from 'react-native'

import { AppScreenProps } from '~/routes/app.routes'

import { useQuery as useRealmQuery } from '~/libs/realm'
import { Historic } from '~/libs/realm/schemas/Historic'

import { Header } from './components/Header'
import { CarStatus } from './components/CarStatus'

import { Container, Body } from './styles'

type Props = AppScreenProps<'home'>
export const HomeScreen: FC<Props> = ({ navigation }) => {
  const historic = useRealmQuery(Historic)

  const { data } = useQuery({
    queryKey: ['historic'],
    queryFn: () => {
      try {
        const vehicle = historic.filtered("status = 'departure'")[0]

        return vehicle
      } catch (e) {
        Alert.alert('Error', 'Fail to get inuse vehicle data.')
        throw e
      }
    },
  })
  const handleRegisterMovement = (vehicleId?: string) => {
    if (!vehicleId) {
      navigation.navigate('departure')
    } else {
      navigation.navigate('arrival', { id: vehicleId })
    }
  }

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
