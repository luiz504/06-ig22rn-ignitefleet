import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  LocationObject,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import {
  removeStorageLocations,
  saveStorageLocation,
} from '~/libs/async-storage/location-storage'

export const BACKGROUND_TASK_NAME = 'location-tracking'
type TaskData = {
  locations?: LocationObject[]
}

TaskManager.defineTask<TaskData>(
  BACKGROUND_TASK_NAME,
  async ({ data, error }) => {
    try {
      if (error) throw error
      if (data.locations) {
        const coords = data.locations[0].coords
        const timestamp = data.locations[0].timestamp

        const currentLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp,
        }
        await saveStorageLocation(currentLocation)
      }
    } catch (err) {
    console.log('err ' + BACKGROUND_TASK_NAME , err) // eslint-disable-line
      stopLocationTask()
    }
  },
)

export async function startLocationTask() {
  try {
    const hasStarted =
      await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (err) {
    console.log('err startLocationTask ', err) // eslint-disable-line
    throw err
  }
}
export async function stopLocationTask() {
  try {
    const hasStarted =
      await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)
    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
      await removeStorageLocations()
    }
  } catch (err) {
    console.log('err stopLocationTask ', err) // eslint-disable-line
    throw err
  }
}
