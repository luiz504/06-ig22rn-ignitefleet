/* eslint-disable no-use-before-define */
import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

export const HISTORIC_STATUS = {
  DEPARTURE: 'DEPARTURE',
  ARRIVAL: 'ARRIVAL',
} as const

type HistoricStatus = keyof typeof HISTORIC_STATUS
type GenerateProps = {
  user_id: string
  license_plate: string
  description: string
}
export class Historic extends Realm.Object<Historic> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  status!: HistoricStatus
  created_at!: Date
  updated_at!: Date

  static generate({ user_id, license_plate, description }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
      status: 'DEPARTURE',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

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
