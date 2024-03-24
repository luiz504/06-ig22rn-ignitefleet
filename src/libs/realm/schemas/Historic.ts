/* eslint-disable no-use-before-define */
import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'
export class Historic extends Realm.Object<Historic> {
  static generate() {}
  static schema: ObjectSchema = {
    name: 'Historic',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
