import { z } from 'zod'

export const accountSchema = z.object({
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
        const word = val.trim().split(/\s+/)
        return word.length >= 2
      },
      {
        message: 'The full name must have at least 2 words'
      }
    ),
  picture: z.string().optional(),
  sub: z.string().optional(),
  attributes: z.any()
})
export type Account = z.infer<typeof accountSchema>

export const userSchema = z.object({
  profile: z.string()
})
export type User = z.infer<typeof userSchema>
