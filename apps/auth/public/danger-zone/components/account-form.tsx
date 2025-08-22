'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar'
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
import { Textarea } from '@repo/design-system/components/ui/textarea'
import { Loader2Icon, MoveRight } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Account, type User, userSchema } from '../schemas/account'

export function AccountForm({ profile }: User) {
  const [loading, setLoading] = useState(false)

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      profile: profile || ''
    }
  })

  const onSubmit = async (values: Account) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const parsedValues = {
      ...values
    }

    // const data = await updateUser({ attributes: parsedValues })

    showSubmittedData(parsedValues)
    setLoading(false)
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="flex-1">
        <Form {...form}>
          <form className="space-y-6" id="group-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Tell us a little bit about yourself"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="flex items-center"
              disabled={loading}
              form="group-form"
              type="submit"
            >
              Save
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <MoveRight className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="ml-16">
        <Avatar className="h-52 w-52">
          <AvatarImage className="h-52 w-52" src={'attributes.picture'} />
          <AvatarFallback>RR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
