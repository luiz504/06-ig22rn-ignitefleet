import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_ASYNC_KEYS = {
  LAST_SYNC: '@ignitefleet:last_sync',
} as const

export async function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime()
  await AsyncStorage.setItem(STORAGE_ASYNC_KEYS.LAST_SYNC, timestamp.toString())

  return timestamp
}

export async function getLastSyncTimestamp() {
  const timestamp = await AsyncStorage.getItem(STORAGE_ASYNC_KEYS.LAST_SYNC)

  if (!timestamp) return null

  return Number(timestamp)
}
