import { Historic } from '~/libs/realm/schemas/Historic'
import { Realm } from 'realm'
import { CoordsSchemaProps } from '~/libs/realm/schemas/Coords'

type DepartureData = {
  userId: string
  licensePlate: string
  description: string
  coords: CoordsSchemaProps[]
}
export const registerDeparture = async (realm: Realm, data: DepartureData) => {
  realm.write(() => {
    realm.create(
      'Historic',
      Historic.generate({
        user_id: data.userId,
        license_plate: data.licensePlate,
        description: data.description,
        coords: data.coords,
      }),
    )
  })
}
