import { Button } from '@repo/design-system/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@repo/design-system/components/ui/dropdown-menu'
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react'
import type { Row } from '@tanstack/react-table'
import { useUsers } from '../context/users-context'
import type { User } from '../data/schema'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="flex h-8 w-8 p-0 data-[state=open]:bg-muted" variant="ghost">
          <IconDots className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('enable-disable-user')
          }}
        >
          {row.original.enabled ? 'Enable user' : 'Disable user'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('reset-password')
          }}
        >
          Reset password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('edit')
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <IconEdit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500!"
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('delete')
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
