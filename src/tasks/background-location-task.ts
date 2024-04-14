import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'

export const BACKGROUND_TASK_NAME = 'location-tracking'

TaskManager.defineTask(BACKGROUND_TASK_NAME, ({ data, error }: any) => {
  try {
    if (error) throw error

    const coords = data?.locations[0].coords
    const timeStamp = data?.locations[0].timestamp

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timeStamp,
    }
    console.log('cc', currentLocation)
  } catch (err) {
    console.log('err ' + BACKGROUND_TASK_NAME , err) // eslint-disable-line
    throw err
  }
})

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
    }
  } catch (err) {
    console.log('err stopLocationTask ', err) // eslint-disable-line
    throw err
  }
}
