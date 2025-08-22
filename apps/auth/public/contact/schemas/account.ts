import { z } from 'zod'

export const createGroupSchema = z.object({
  body: z.object({
    name: z.string().min(3, {
      message: 'Group must be at least 3 characters long.'
    }),
    description: z.string().optional(),
    precedence: z.number().optional()
  })
})

export const updateGroupSchema = z.object({
  params: z.object({
    name: z.string().min(3, {
      message: 'Group must be at least 3 characters long.'
    }),
    description: z.string().optional(),
    precedence: z.number().optional()
  })
})

const forbidden = ['superadmin', 'admin', 'editor', 'viewer', 'guest', 'manager', 'user']

export const deleteGroupSchema = z.object({
  params: z.object({
    name: z.string().refine((val) => !forbidden.includes(val), {
      message: 'The group cannot be deleted.'
    })
  })
})

export const accountSchema = z.object({
  email: z.string().optional(),
  email_verified: z.string().optional(),
  phone_number: z.string().optional(),
  phone_number_verified: z.string().optional()
})
export type Account = z.infer<typeof accountSchema>
