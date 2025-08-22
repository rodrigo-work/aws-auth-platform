import { z } from 'zod'

export const accountSchema = z.object({
  name: z.string().optional(),
  birthdate: z.string().optional(),
  picture: z.string().optional()
})
export type Account = z.infer<typeof accountSchema>

export const formAccountSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'This field is required'
    })
    .min(3, {
      message: 'Name must be at least 3 characters'
    })
    .refine(
      (val) => {
        // biome-ignore lint/performance/useTopLevelRegex: <explanation>
        const word = val.trim().split(/\s+/)
        return word.length >= 2
      },
      {
        message: 'The full name must have at least 2 words'
      }
    ),
  birthdate: z.any().optional(),
  picture: z.string()
})
export type FormAccount = z.infer<typeof formAccountSchema>

export const accountContactSchema = z.object({
  email: z
    .email({
      message: 'Email is invalid'
    })
    .optional(),
  email_verified: z.string().optional(),
  code: z.string().min(6).max(6).optional()
})
export type AccountContact = z.infer<typeof accountContactSchema>
