import { reverseGeocodeAsync, LocationObjectCoords } from 'expo-location'
export const getAddressLocation = async ({
  latitude,
  longitude,
}: LocationObjectCoords) => {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude })
    console.log(addressResponse)
    return addressResponse[0]?.street
  } catch (e) {
    console.log(e)
  }
}
