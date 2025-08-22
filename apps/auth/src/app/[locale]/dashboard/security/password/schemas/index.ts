import type { Dictionary } from '@repo/internationalization'
import { z } from 'zod'

export const passwordSchema = z.object({
  username: z.string()
})
export type Password = z.infer<typeof passwordSchema>

export function formSchema(dictionary: Dictionary) {
  const msg = dictionary.web.password.form

  return z
    .object({
      currentPassword: z
        .string()
        .nonempty({ message: msg.currentPassword.required })
        .min(6, { message: msg.currentPassword.minLength }),

      newPassword: z
        .string()
        .nonempty({ message: msg.newPassword.required })
        .min(6, { message: msg.newPassword.minLength }),

      confirmPassword: z
        .string()
        .nonempty({ message: msg.confirmPassword.required })
        .min(6, { message: msg.confirmPassword.minLength })
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirm_new_password']
    })
}
export type FormSchema = z.infer<ReturnType<typeof formSchema>>
