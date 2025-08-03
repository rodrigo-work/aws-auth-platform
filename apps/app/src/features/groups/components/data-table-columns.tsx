'use client'

import { DataTableColumnHeader } from '@repo/design-system/components/table/data-table-column-header'
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar'
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
        return null
      }

      return (
        <div className="flex items-center space-x-2">
          {userType.icon && <userType.icon className="text-muted-foreground" size={16} />}
          <span className="truncate font-medium text-bold">{name.toUpperCase()}</span>
        </div>
      )
    },
    meta: {
      label: 'Name',
      placeholder: 'Search groups...',
      variant: 'text'
    },
    size: 160,
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate whitespace-normal font-normal">
            {row.getValue('description')}
          </span>
        </div>
      )
    },
    size: 280,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'user_status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="user_status" />,
    cell: ({ row }) => {
      // const { enabled, user_status } = row.original
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('user_status')}</span>
        </div>
      )
    },
    meta: {
      label: 'Precedence',
      variant: 'number'
    },
    size: 20,
    enableSorting: true,
    enableHiding: true
  },
  // {
  //   id: 'users',
  //   accessorKey: 'users',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Users" />
  //   ),
  //   cell: ({ row }) => {
  //     const { users } = row.original
  //     const members = users.map((obj) => obj.email)

  //     return (
  //       <div className="flex flex-row space-x-2">
  //         <span className="-space-x-2 flex truncate">
  //           {members.slice(0, 7).map((g) => {
  //             return (
  //               <Avatar key={g}>
  //                 <AvatarFallback>
  //                   {g[0].toUpperCase()}
  //                   {g[1].toUpperCase()}
  //                 </AvatarFallback>
  //               </Avatar>
  //             )
  //           })}
  //           {members.length > 2 && (
  //             <span className="flex items-center font-small">
  //               <Avatar>
  //                 <AvatarFallback> {`+${members.length}`}</AvatarFallback>
  //               </Avatar>
  //             </span>
  //           )}
  //         </span>
  //       </div>
  //     )
  //   },
  //   size: 160,
  //   enableSorting: false,
  //   enableHiding: false
  // },
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
