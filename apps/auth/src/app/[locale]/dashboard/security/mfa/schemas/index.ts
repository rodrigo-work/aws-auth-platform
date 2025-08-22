import { z } from 'zod'

export const accountSchema = z.object({
  username: z.string(),
  email: z.email(),
  mfa: z.boolean()
})
export type Account = z.infer<typeof accountSchema>

export const formSchema = z.object({
  mfa: z.boolean(),
  code: z
    .string()
    .nonempty({ message: 'This field is required' })
    .min(6, { message: 'Must be at least 6 characters' })
    .max(6, { message: 'Must be at most 6 characters' })
})
export type FormSchema = z.infer<typeof formSchema>
