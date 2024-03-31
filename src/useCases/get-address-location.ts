import { reverseGeocodeAsync, LocationObjectCoords } from 'expo-location'
export const getAddressLocation = async ({
  latitude,
  longitude,
}: LocationObjectCoords) => {
  const addressResponse = await reverseGeocodeAsync({ latitude, longitude })

  return addressResponse[0]
}
