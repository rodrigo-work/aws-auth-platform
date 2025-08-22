import { z } from 'zod'

export const appearanceSchema = z.object({
  locale: z
    .string()
    .nonempty({
      message: 'Please select a language'
    })
    .optional(),
  zoneinfo: z
    .string()
    .nonempty({
      message: 'This field is required'
    })
    .optional(),
  theme: z
    .enum(['system', 'light', 'dark'], {
      message: 'Please select a theme'
    })
    .optional(),
  profile: z.string().optional()
})
export type Appearance = z.infer<typeof appearanceSchema>

export const appearanceSchema2 = z.object({
  locale: z.string().nonempty({
    message: 'Please select a language'
  }),
  zoneinfo: z.string().nonempty({
    message: 'This field is required'
  }),
  theme: z
    .enum(['system', 'light', 'dark'], {
      message: 'Please select a theme'
    })
    .optional(),
  profile: z.string().optional()
})
export type Appearance2 = z.infer<typeof appearanceSchema2>
