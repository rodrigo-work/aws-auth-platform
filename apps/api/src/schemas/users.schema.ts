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

export const updateUserSchema = z.object({
  body: z.object({
    username: z.email(),
    gender: z.string().optional(),
    name: z.string().optional()
  })
})

const forbidden = ['me@rodrigo3d.com', 'me@rodrigo.work']

export const deleteUserSchema = z.object({
  params: z.object({
    username: z.string().refine((val) => !forbidden.includes(val), {
      message: 'The user cannot be deleted.'
    })
  })
})

export const userSchema = z.object({
  Enabled: z.boolean(),
  UserCreateDate: z.coerce.date(),
  UserLastModifiedDate: z.coerce.date(),
  UserStatus: z.string(),
  Username: z.string()
})
export type User = z.infer<typeof userSchema>

export const usersSchema = z.array(userSchema)
export type Users = z.infer<typeof usersSchema>

// Group(s) schema
export const groupSchema = z.object({
  GroupName: z.string()
})
export type Group = z.infer<typeof groupSchema>

export const groupsSchema = z.array(groupSchema)
export type Groups = z.infer<typeof groupsSchema>
