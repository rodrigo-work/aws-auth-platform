'use client'

import { formatDate, formatISODate, normalizeDateLocal } from '@/lib/format'
import { updateUser } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar'
import { Button } from '@repo/design-system/components/ui/button'
import { Calendar } from '@repo/design-system/components/ui/calendar'
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
import { Popover, PopoverContent, PopoverTrigger } from '@repo/design-system/components/ui/popover'
import { IconUser } from '@tabler/icons-react'
import { CalendarIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Account, type FormAccount, formAccountSchema } from '../schemas/account'

export function AccountForm({ attributes }: { attributes: Account }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<FormAccount>({
    resolver: zodResolver(formAccountSchema),
    defaultValues: {
      name: attributes.name || '',
      birthdate: normalizeDateLocal(attributes.birthdate) || undefined,
      picture: attributes.picture || ''
    }
  })

  const onSubmit = async (values: Account) => {
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (values.name) {
      const [given_name, ...rest] = values.name.trim().split(' ')
      const family_name = rest.join(' ')
      const birthdate = formatISODate(values.birthdate)

      const parsedValues = {
        ...values,
        birthdate,
        given_name,
        family_name
      }

      const data = await updateUser({ attributes: parsedValues })
      showSubmittedData(data)
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="flex-1">
        <Form {...form}>
          <form className="space-y-6" id="account-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={loading}
              name="name"
              render={({ field }) => (
                <FormItem className="gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile and in emails.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={loading}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover onOpenChange={setOpen} open={open}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button onClick={() => setOpen(true)} variant="outline">
                          {field.value ? formatDate(field.value) : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        captionLayout="dropdown"
                        mode="single"
                        onSelect={(date) => {
                          field.onChange(date)
                          setOpen(false)
                        }}
                        selected={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-[180px]"
              disabled={!form.formState.isDirty || loading}
              form="account-form"
              type="submit"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              Update account
            </Button>
          </form>
        </Form>
      </div>

      <div className="hidden sm:ml-6 sm:block">
        <Avatar className="h-52 w-52">
          <AvatarImage className="h-52 w-52" src={attributes.picture} />
          <AvatarFallback>
            <IconUser className="h-26 w-26" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
