'use client'

import { DataTable } from '@repo/design-system/components/table/data-table'
import { DataTableToolbar } from '@repo/design-system/components/table/data-table-toolbar'
import { Button } from '@repo/design-system/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@repo/design-system/components/ui/dropdown-menu'
import { useDataTable } from '@repo/design-system/hooks/use-data-table'
import { IconChevronDown, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'

interface TableProps<TData, TValue> {
  data: TData[]
  totalItems?: number
  columns: ColumnDef<TData, TValue>[]
}

export function UsersTable<TData, TValue>({
  data,
  totalItems = 0,
  columns
}: TableProps<TData, TValue>) {
  const [pageSize] = useQueryState('limit', parseAsInteger.withDefault(10))
  const pageCount = Math.ceil(totalItems / pageSize)

  const { table } = useDataTable({
    data, // users data
    columns, // users columns
    pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  })

  // const { setOpen, setCurrentRow } = useGroups()

  const isSelected = table.getSelectedRowModel().rows.map((obj) => obj.original)
  const isSelectedLength = isSelected.length
  // const isFiltered = table.getState().columnFilters.length > 0

  return (
    <DataTable table={table}>
      {/* <code className="tex-sm"> {JSON.stringify(isSelected)}</code> */}
      <DataTableToolbar table={table}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Toggle columns"
              className="ml-auto hidden h-8 lg:flex"
              disabled={isSelectedLength === 0}
              size="sm"
              variant="outline"
            >
              <IconDotsVertical />
              Actions
              <IconChevronDown className="ml-auto opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              disabled={isSelectedLength > 1}
              // onClick={() => {
              //   setCurrentRow(row.original)
              //   setOpen('edit')
              // }}
            >
              Edit
              <DropdownMenuShortcut>
                <IconEdit size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500!"
              // onClick={() => {
              //   setCurrentRow(row.original)
              //   setOpen('delete')
              // }}
            >
              Delete
              <DropdownMenuShortcut>
                <IconTrash size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DataTableToolbar>
    </DataTable>
  )
}
