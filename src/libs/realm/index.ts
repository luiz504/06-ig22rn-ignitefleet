import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic'
export const {
  RealmProvider,
  useRealm,
  useQuery: useRealmQuery,
  useObject,
} = createRealmContext({ schema: [Historic] })
