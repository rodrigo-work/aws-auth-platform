'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar'
import { Button } from '@repo/design-system/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/design-system/components/ui/form'
import { Input } from '@repo/design-system/components/ui/input'
import type { Dictionary } from '@repo/internationalization'
import { IconPassword } from '@tabler/icons-react'
import { Eye, EyeOff, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changeUserPassword } from '../actions'
import { type FormSchema, formSchema, type Password } from '../schemas'

interface ShowPasswordButtonProps {
  onToggle: () => void
  showPassword: boolean
}

export function ShowPasswordButton({ onToggle, showPassword }: ShowPasswordButtonProps) {
  return (
    <Button
      className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground hover:text-primary"
      onClick={onToggle}
      tabIndex={-1}
      type="button"
      variant="ghost"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </Button>
  )
}

export function PasswordForm({
  attributes,
  dictionary
}: {
  attributes: Password
  dictionary: Dictionary
}) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema(dictionary)),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: FormSchema) => {
    setLoading(true)

    const parsedValues = {
      ...attributes,
      ...values
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    const data = await changeUserPassword({ attributes: parsedValues })
    showSubmittedData(data)
    setLoading(false)
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">
        <Form {...form}>
          <form className="space-y-6" id="password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="gap-2">
                  <FormLabel>{dictionary.web.password.form.currentPassword.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-10"
                        placeholder={dictionary.web.password.form.currentPassword.placeholder}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <ShowPasswordButton
                        onToggle={() => setShowPassword((prev) => !prev)}
                        showPassword={showPassword}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    {dictionary.web.password.form.currentPassword.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex-1 gap-2">
                  <FormLabel>{dictionary.web.password.form.newPassword.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-10"
                        placeholder={dictionary.web.password.form.newPassword.placeholder}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <ShowPasswordButton
                        onToggle={() => setShowPassword((prev) => !prev)}
                        showPassword={showPassword}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1 gap-2">
                  <FormLabel>{dictionary.web.password.form.confirmPassword.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-10"
                        placeholder={dictionary.web.password.form.confirmPassword.placeholder}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <ShowPasswordButton
                        onToggle={() => setShowPassword((prev) => !prev)}
                        showPassword={showPassword}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-[180px]"
              // disabled={!form.formState.isDirty || loading}
              form="password-form"
              type="submit"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              Update password
            </Button>
          </form>
        </Form>
      </div>

      <div className="hidden sm:ml-6 sm:block">
        <Avatar className="h-52 w-52 rounded-lg">
          <AvatarFallback className="rounded-lg">
            <IconPassword className="h-26 w-26" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
