'use client'

import { formatDate } from '@/lib/format'
import { DataTableColumnHeader } from '@repo/design-system/components/table/data-table-column-header'
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar'
import { Badge } from '@repo/design-system/components/ui/badge'
import { Checkbox } from '@repo/design-system/components/ui/checkbox'
import { cn } from '@repo/design-system/lib/utils'
import { IconCalendar, IconCircleCheck, IconCircleMinus } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { TooltipCustom } from '../../components/tooltip-custom'
import { userStatus } from '../data/data'
import type { User } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

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
      const { name } = row.original

      return (
        <div className="flex items-center space-x-2">
          <span className="truncate font-medium text-bold">{name}</span>
        </div>
      )
    },
    size: 160,
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true
  },
  {
    accessorKey: 'email_verified',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const { email, email_verified } = row.original
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
    enableHiding: true
  },
  {
    accessorKey: 'phone_number_verified',
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
    meta: {
      label: 'Phone'
    },
    size: 60,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'user_status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const { enabled, user_status } = row.original
      const status = enabled ? 'DISABLED' : user_status
      const userType = userStatus.find(({ value }) => value === status)

      return (
        <div className="flex space-x-2">
          <Badge
            className={cn('capitalize-- rounded-sm text-xs', userType?.color)}
            variant="outline"
          >
            {userType?.label}
          </Badge>
          {!userType?.color && userType?.label}
        </div>
      )
    },
    filterFn: (row, _columnId, value) => {
      const { enabled, user_status } = row.original
      const status = enabled ? 'DISABLED' : user_status

      // return value.includes(status).length
      return value.includes(status)
    },
    meta: {
      label: 'Status',
      variant: 'multiSelect' // ou 'multiSelect' se quiser múltiplas seleções
    },
    size: 60,
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true
  },
  {
    accessorKey: 'groups',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Groups" />,
    cell: ({ row }) => {
      const { groups } = row.original
      // const groupType = groupTypes.find(({ v }) => v === value)

      // if (!groupType) {
      //   return groups
      // }
      // const members = groups.map((g) => g.name)
      // const uniqueRoles = [...new Set(members)]

      return (
        <div className="flex space-x-2">
          <span className="-space-x-2 flex truncate">
            {groups.slice(0, 4).map((g) => {
              return (
                <Avatar key={g}>
                  <AvatarFallback>
                    {g[0].toUpperCase()}
                    {g[1].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )
            })}
            {groups.length > 4 && (
              <span className="flex items-center font-small">
                <Avatar>
                  <AvatarFallback> {`+${groups.length}`}</AvatarFallback>
                </Avatar>
              </span>
            )}
          </span>
        </div>
      )
    },
    meta: {
      label: 'Groups'
    },
    size: 60,
    enableSorting: false,
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
