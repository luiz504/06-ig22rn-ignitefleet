import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Header } from './components/Header'
import { CarStatus } from './components/CarStatus'

import { Container, Body } from './styles'

import { AppScreenProps } from '~/routes/app.routes'
import { useQuery as useRealmQuery } from '~/libs/realm'
import { Historic } from '~/libs/realm/schemas/Historic'
import { Alert } from 'react-native'

type Props = AppScreenProps<'home'>
export const HomeScreen: FC<Props> = ({ navigation }) => {
  const handleRegisterMovement = () => {
    navigation.navigate('departure')
  }
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
  useEffect(() => {
    console.log('data', JSON.stringify(data, null, 2))
  }, [data])
  return (
    <Container>
      <Header />

      <Body>
        <CarStatus
          licensePlate={data?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Body>
    </Container>
  )
}
