import { z } from 'zod'

export const contactPhoneSchema = z.object({
  email: z.string().optional(),
  email_verified: z.string().optional(),
  phone_number: z.string().optional(),
  phone_number_verified: z.string().optional()
})
export type ContactPhone = z.infer<typeof contactPhoneSchema>
