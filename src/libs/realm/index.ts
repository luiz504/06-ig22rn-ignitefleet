import Realm, { SyncConfiguration } from 'realm'
import { createRealmContext } from '@realm/react'

import { Historic } from './schemas/Historic'
import { Coords } from './schemas/Coords'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}
export const syncConfig: Partial<SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
}
export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({ schema: [Historic, Coords], schemaVersion: 1 })
