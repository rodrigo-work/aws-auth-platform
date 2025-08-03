'use client'

import { DataTableColumnHeader } from '@repo/design-system/components/table/data-table-column-header'
import { Badge } from '@repo/design-system/components/ui/badge'
import { Checkbox } from '@repo/design-system/components/ui/checkbox'
import { cn } from '@repo/design-system/lib/utils'
import { IconCalendar, IconCircleCheck, IconCircleMinus } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/lib/format'
import { callTypes } from '../data/data'
import type { User } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { TooltipCustom } from './TooltipCustom'

export const columns: ColumnDef<User>[] = [
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
      const { name, username } = row.original
      // const userType = groupTypes.find(({ value }) => value === name)

      // if (!userType) {
      //   return null
      // }

      return (
        <div className="flex items-center space-x-2">
          {/* {userType.icon && (
            <userType.icon className="text-muted-foreground" size={16} />
          )} */}
          <span className="truncate font-medium text-bold">{name}</span>
        </div>
      )
    },
    meta: {
      label: 'Name',
      placeholder: 'Search users...',
      variant: 'text'
    },
    size: 160,
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const { email, email_verified } = row.original
      // const userType = groupTypes.find(({ value }) => value === name)

      // if (!userType) {
      //   return null
      // }

      return (
        <div className="flex items-center space-x-2">
          <TooltipCustom tooltipContent={email_verified ? 'email verified' : 'emailnot verified'}>
            {email_verified && email_verified ? (
              <IconCircleCheck className="text-green-500" size={16} />
            ) : (
              <IconCircleMinus className="text-red-500" size={16} />
            )}
          </TooltipCustom>
          <span className="truncate font-medium text-bold">{email}</span>
        </div>
      )
    },
    meta: {
      label: 'Email'
    },
    size: 160,
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true
  },
  {
    id: 'phone_number',
    accessorKey: 'phone_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => {
      const { phone_number, phone_number_verified } = row.original

      return (
        <div className="flex items-center space-x-2">
          <TooltipCustom
            tooltipContent={phone_number_verified ? 'phone verified' : 'phone not verified'}
          >
            {phone_number_verified && phone_number_verified ? (
              <IconCircleCheck className="text-green-500" size={16} />
            ) : (
              <IconCircleMinus className="text-red-500" size={16} />
            )}
          </TooltipCustom>
          <span className="truncate font-medium text-bold">{phone_number}</span>
        </div>
      )
    },
    size: 60,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'user_status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const { enabled, user_status } = row.original
      const badgeColor = callTypes[user_status ?? 'NULL']

      return (
        <div className="flex space-x-2">
          <Badge className={cn('capitalize', badgeColor)} variant="outline">
            {/* {enabled ? user_status : 'DISABLED'} */}
            {user_status} {enabled ? 'enabled' : 'disabled'}
          </Badge>
        </div>
      )
    },
    meta: {
      label: 'Status'
    },
    size: 60,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'users',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Groups" />,
    cell: ({ row }) => {
      const { groups } = row.original
      const members = groups.map((g) => g.name)
      const uniqueRoles = [...new Set(members)]

      return (
        <div className="flex flex-row space-x-2">
          {JSON.stringify(members, null, 2)}
          {/* <span className="-space-x-2 flex truncate">
            {uniqueRoles.slice(0, 4).map((g) => {
              return (
                <Avatar key={g}>
                  <AvatarFallback>
                    {g[0].toUpperCase()}
                    {g[1].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )
            })}
            {uniqueRoles.length > 4 && (
              <span className="flex items-center font-small">
                <Avatar>
                  <AvatarFallback> {`+${uniqueRoles.length}`}</AvatarFallback>
                </Avatar>
              </span>
            )}
          </span> */}
        </div>
      )
    },
    size: 60,
    enableSorting: false,
    enableHiding: false
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
      label: 'Last modified'
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
