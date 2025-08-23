import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('DISABLED'),
  z.literal('COMPROMISED'),
  z.literal('UNCONFIRMED'),
  z.literal('CONFIRMED'),
  z.literal('RESET_REQUIRED'),
  z.literal('UNKNOWN'),
  z.literal('ARCHIVED'),
  z.literal('FORCE_CHANGE_PASSWORD'),
  z.literal('NULL')
])
export type UserStatus = z.infer<typeof userStatusSchema>

const memberGroupSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('guest'),
  z.literal('editor'),
  z.literal('viewer'),
  z.literal('NULL')
])
export type MemberStatus = z.infer<typeof memberGroupSchema>

export const userGroupsSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  precedence: z.number().optional(),
  // createdAt: z.string(),
  updatedAt: z.coerce.date()
})

export const userSchema = z
  .object({
    sub: z.string().optional(),
    name: z.string().optional(),
    phone_number: z.string().optional(),
    phone_number_verified: z.any().optional(),

    username: z.string(),
    email: z.email(),
    email_verified: z.any().optional(),
    enabled: z.boolean(),
    user_status: userStatusSchema.optional(),
    updatedAt: z.coerce.date(),
    groups: z.array(z.any())
  })
  .strip()
export type User = z.infer<typeof userSchema>

export const usersSchema = z.array(userSchema)
export type Users = z.infer<typeof usersSchema>

export const userGroupsSchema2 = z.object({
  name: z.string()
  // description: z.string().optional(),
  // precedence: z.number().optional(),
  // createdAt: z.string(),
  // updatedAt: z.coerce.date()
})

export const userSchema2 = z
  .object({
    // sub: z.string().optional(),
    name: z.string().optional(),
    email: z.email(),
    groups: z.array(userGroupsSchema2)
    // phone_number: z.string().optional(),
    // phone_number_verified: z.any().optional(),

    // username: z.string(),
    // email_verified: z.any().optional(),
    // enabled: z.boolean(),
    // user_status: userStatusSchema.optional(),
    // updatedAt: z.coerce.date()
  })
  .strip()
export const usersSchema2 = z.array(userSchema2)
