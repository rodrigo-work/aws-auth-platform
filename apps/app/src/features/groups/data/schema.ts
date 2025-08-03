import { z } from 'zod'

export const userSchema = z
  .object({
    sub: z.string(),
    email: z.string()
  })
  .strip()

export const groupSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    precedence: z.number().optional(),
    // createdAt: z.string(),
    updatedAt: z.coerce.date(),
    users: z.array(userSchema).optional()
  })
  .strip()
export type Group = z.infer<typeof groupSchema>

export const groupsSchema = z.array(groupSchema)
export type Groups = z.infer<typeof groupsSchema>

export const userSchema2 = z
  .object({
    username: z.string().optional(),
    name: z.string().optional(),
    email: z.email().optional()
  })
  .strip()
export type User = z.infer<typeof userSchema2>

export const usersSchema = z.array(userSchema2)
export type Users = z.infer<typeof usersSchema>
