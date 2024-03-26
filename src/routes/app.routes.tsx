import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { HomeScreen } from '~/screens/app/Home'
import { DepartureScreen } from '~/screens/app/Departure'
import { Arrival } from '~/screens/app/Arrival'

export type AppRoutesList = {
  home: undefined
  departure: undefined
  arrival: { id: string }
}
export type AppScreenProps<RouteName extends keyof AppRoutesList> =
  NativeStackScreenProps<AppRoutesList, RouteName>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesList>()

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="departure" component={DepartureScreen} />
      <Screen name="arrival" component={Arrival} />
    </Navigator>
  )
}
