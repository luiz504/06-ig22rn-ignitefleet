import { Historic } from '~/libs/realm/schemas/Historic'
import { Realm } from 'realm'
import { CoordsSchemaProps } from '~/libs/realm/schemas/Coords'

export const registerArrival = async (
  realm: Realm,
  historic: Historic,
  coords: CoordsSchemaProps[],
) => {
  realm.write(() => {
    historic.status = 'ARRIVAL'
    historic.updated_at = new Date()
    historic.coords.push(...coords)
  })
}
