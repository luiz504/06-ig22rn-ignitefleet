import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { HomeScreen } from '~/screens/Home'
import { DepartureScreen } from '~/screens/Departure'

export type AppRoutesList = {
  home: undefined
  departure: undefined
}
export type AppScreenProps<RouteName extends keyof AppRoutesList> =
  NativeStackScreenProps<AppRoutesList, RouteName>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesList>()

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="departure" component={DepartureScreen} />
    </Navigator>
  )
}
