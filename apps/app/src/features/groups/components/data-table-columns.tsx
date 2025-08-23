'use client'

import { DataTableColumnHeader } from '@repo/design-system/components/table/data-table-column-header'
import { Checkbox } from '@repo/design-system/components/ui/checkbox'
import { IconCalendar } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/lib/format'
import { groupTypes } from '../data/data'
import type { Group } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Group>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="translate-y-[2px]"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="translate-y-[2px]"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    size: 20,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const { name } = row.original
      const userType = groupTypes.find(({ value }) => value === name)

      if (!userType) {
        return name
      }

      return (
        <div className="flex items-center space-x-2">
          {userType.icon && <userType.icon className="text-muted-foreground" size={16} />}
          <div className="truncate font-medium">
            <span className="flex">{name}</span>
          </div>
        </div>
      )
    },
    meta: {
      label: 'Name',
      placeholder: 'Search groups...',
      variant: 'text'
    },
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => {
      const { name, description, roles } = row.original
      const userType = groupTypes.find(({ value }) => value === name)

      if (!userType) {
        return name
      }
      return (
        <div className="gap-2 space-x-2">
          <span className="truncate whitespace-normal font-normal">{description}</span>
          <br />
          {roles?.map((r) => (
            <span className="bg-muted-foreground/10 text-xs italic" key={r}>
              {`role:${r}; `}
            </span>
          ))}
        </div>
      )
    },
    meta: {
      label: 'Description'
    },
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'precedence',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Precedence" />,
    cell: ({ row }) => {
      const { precedence } = row.original

      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{precedence}</span>
        </div>
      )
    },
    meta: {
      label: 'Precedence'
    },
    size: 40,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last modified" />,
    cell: ({ row }) => {
      const { updatedAt } = row.original

      return (
        <div className="flex items-center space-x-2">
          {updatedAt && <IconCalendar className="text-muted-foreground" size={16} />}
          <span className="truncate font-medium text-bold text-sm lowercase">
            {formatDate(updatedAt)}
          </span>
        </div>
      )
    },
    meta: {
      label: 'Last modified',
      variant: 'date'
    },
    size: 40,
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    size: 20,
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
