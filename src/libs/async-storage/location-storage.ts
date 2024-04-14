import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@ignitefleet:location'

type LocationStorage = {
  latitude: number
  longitude: number
  timestamp: number
}

export async function getStorageLocations() {
  const stored = await AsyncStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  return (JSON.parse(stored) as LocationStorage[]) || []
}
export async function saveStorageLocation(newLocation: LocationStorage) {
  const stored = await getStorageLocations()
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...stored, newLocation]),
  )
}

export async function removeStorageLocations() {
  await AsyncStorage.removeItem(STORAGE_KEY)
}
