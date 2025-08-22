'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Button } from '@repo/design-system/components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/design-system/components/ui/form'
import { Input } from '@repo/design-system/components/ui/input'
import { Separator } from '@repo/design-system/components/ui/separator'
import { Textarea } from '@repo/design-system/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'

const formSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'Name is required.'
    })
    .min(3, {
      message: 'Name must be at least 3 characters.'
    })
})
type UserInviteForm = z.infer<typeof formSchema>

export default function Page() {
  // const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  // searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    showSubmittedData(values)
  }

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader description={'Delete your account'} title={'Danger zone'} />

        <Separator />

        <PageContent
          description="Your organization will be deleted and cannot be restored. This is irreversible."
          title="Delete my organization"
        >
          <div className="flex-1">
            <Form {...form}>
              <form className="space-y-4" id="group-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Reason for Deletion <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder="We would love to know why you want to delete your account."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button form="group-form" type="submit" variant={'destructive'}>
                  Delele bla bla bla
                </Button>
              </form>
            </Form>
          </div>
        </PageContent>
      </div>
    </PageContainer>
  )
}
