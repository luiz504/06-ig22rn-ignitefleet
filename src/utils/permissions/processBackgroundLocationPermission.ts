import * as Location from 'expo-location'
import * as Linking from 'expo-linking'
import { Alert } from 'react-native'

type Response = 'GRANTED' | 'DENIED' | 'CANCELED'
export const processBackgroundLocationPermission =
  async (): Promise<Response> => {
    const currentPermission = await Location.getBackgroundPermissionsAsync()

    if (currentPermission.granted) {
      return 'GRANTED'
    }
    if (currentPermission.canAskAgain) {
      const newPermission = await Location.requestBackgroundPermissionsAsync()

      if (newPermission.granted) {
        return 'GRANTED'
      }

      return 'DENIED'
    }

    if (!currentPermission.canAskAgain) {
      const AsyncAlert = new Promise<Response>((resolve) => {
        Alert.alert(
          'Required Permission.',
          'This feature requires the following permission and settings enabled "Allow all the time" and "use precise location".',
          [
            {
              text: 'Open Settings',
              onPress: async () => {
                Promise.all([Linking.openSettings(), resolve('CANCELED')])
              },
              style: 'default',
            },
            {
              text: 'Cancel',
              onPress: () => resolve('CANCELED'),
              style: 'cancel',
            },
          ],
          { onDismiss: () => resolve('CANCELED'), cancelable: true },
        )
      })

      const result = await AsyncAlert

      return result
    }

    return 'CANCELED'
  }
