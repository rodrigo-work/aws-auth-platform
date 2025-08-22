'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Badge } from '@repo/design-system/components/ui/badge'
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
import { Loader2Icon, MoveRight } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type ContactPhone, contactPhoneSchema } from '../schemas/contact-phone-schema'

export function ContactPhoneForm({ attributes }: { attributes: ContactPhone }) {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactPhone>({
    resolver: zodResolver(contactPhoneSchema),
    defaultValues: {
      phone_number: attributes?.phone_number || '',
      phone_number_verified: attributes?.phone_number_verified || ''
    }
  })

  const onSubmit = (values: ContactPhone) => {
    setLoading(true)
    // const data = await updateUser({ attributes: values })
    showSubmittedData(values)
    setLoading(false)
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="flex-1">
        <Form {...form}>
          <form
            className="space-y-6"
            id="contact-phone-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="gap-2">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      type="text"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription className="flex flex-row justify-between">
                    <span className="flex-1">
                      This is the phone number that will be displayed on your profile and in emails.
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Phone number verified{' '}
                      <Badge variant="destructive">{attributes.phone_number_verified}</Badge>
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="flex"
              disabled={loading}
              form="contact-phone-form"
              type="submit"
              variant={attributes.phone_number_verified === 'false' ? 'destructive' : 'outline'}
            >
              Phone number verified{' '}
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <MoveRight className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
