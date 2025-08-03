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

export const groupSchema = z.object({
  GroupName: z.string(),
  Description: z.string().optional(),
  Precedence: z.number().optional(),
  CreationDate: z.coerce.date(),
  LastModifiedDate: z.coerce.date()
})
export type Group = z.infer<typeof groupSchema>

export const groupsSchema = z.array(groupSchema)
export type Groups = z.infer<typeof groupsSchema>

// Group(s) schema
export const groupMinimalSchema = z.object({
  GroupName: z.string()
})
export type GroupMinimal = z.infer<typeof groupMinimalSchema>

export const groupsMinimalSchema = z.array(groupMinimalSchema)
export type GroupsMinimal = z.infer<typeof groupsMinimalSchema>
