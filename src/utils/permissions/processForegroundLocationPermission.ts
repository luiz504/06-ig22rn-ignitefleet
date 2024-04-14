import * as Location from 'expo-location'
import * as Linking from 'expo-linking'
import { Alert } from 'react-native'

type Response = 'GRANTED' | 'DENIED' | 'CANCELED'
export const processForegroundLocationPermission =
  async (): Promise<Response> => {
    const currentPermission = await Location.getForegroundPermissionsAsync()
    console.log('dd', currentPermission)
    if (currentPermission.granted) {
      return 'GRANTED'
    }
    if (
      currentPermission.status === Location.PermissionStatus.UNDETERMINED ||
      (currentPermission.status === Location.PermissionStatus.DENIED &&
        currentPermission.canAskAgain)
    ) {
      const newPermission = await Location.requestForegroundPermissionsAsync()

      if (newPermission.granted) {
        return 'GRANTED'
      }

      return 'DENIED'
    }

    if (!currentPermission.canAskAgain) {
      const AsyncAlert = new Promise<Response>((resolve) => {
        Alert.alert(
          'Required Permission.',
          'This feature requires location permission. Please enable it in your settings.',
          [
            {
              text: 'Open Settings',
              onPress: async () => {
                await Linking.openSettings()
                resolve('CANCELED')
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
