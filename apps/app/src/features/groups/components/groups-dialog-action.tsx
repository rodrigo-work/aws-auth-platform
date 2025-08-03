import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Button } from '@repo/design-system/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/design-system/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/design-system/components/ui/form'
import { Input } from '@repo/design-system/components/ui/input'
import { Textarea } from '@repo/design-system/components/ui/textarea'
import { IconMailPlus } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { Group } from '../data/schema'

const formSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'Name is required.'
    })
    .min(3, {
      message: 'Name must be at least 3 characters.'
    }),
  precedence: z.number().optional(),
  description: z.string().optional()
})
type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupsDialogAction({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name ? currentRow?.name : '',
      precedence: currentRow?.precedence ? currentRow?.precedence : 0,
      description: currentRow?.description ? currentRow?.description : ''
    }
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
      open={open}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus />
            {isEdit ? 'Edit Group' : 'Add New Group'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the group here. ' : 'Create new group here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" id="group-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: user"
                      type="text"
                      {...field}
                      disabled={isEdit}
                      readOnly={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="precedence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precedence (optional)</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="0"
                      readOnly
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value === '' ? undefined : Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Add a description (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="group-form" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
