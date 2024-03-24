import { z } from 'zod'
export const LICENSE_PLATE_REGEXP = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/

export const licensePlateSchema = z
  .string({ required_error: 'License plate is required.' })
  .regex(LICENSE_PLATE_REGEXP, { message: 'Invalid license plate.' })
