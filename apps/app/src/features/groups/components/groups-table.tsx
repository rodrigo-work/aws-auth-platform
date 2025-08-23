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
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { Settings2 } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

interface GroupsTableProps<TData, TValue> {
  data: TData[]
  totalItems?: number
  columns: ColumnDef<TData, TValue>[]
}

export function GroupsTable<TData, TValue>({
  data,
  totalItems = 0,
  columns
}: GroupsTableProps<TData, TValue>) {
  const [pageSize] = useQueryState('limit', parseAsInteger.withDefault(10))
  const pageCount = Math.ceil(totalItems / pageSize)

  const { table } = useDataTable({
    data, // group data
    columns, // group columns
    pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  })

  // const teste = table.getSelectedRowModel().rows.map((obj) => obj.original.name)
  // const isFiltered = table.getState().columnFilters.length > 0

  return (
    <DataTable table={table}>
      {/* <code className="tex-sm"> {JSON.stringify(teste)}</code> */}
      <DataTableToolbar table={table}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Toggle columns"
              className="ml-auto hidden h-8 lg:flex"
              size="sm"
              variant="outline"
            >
              <Settings2 />
              Actions
              <IconChevronDown className="ml-auto opacity-50" />
            </Button>
            {/* <Button
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                variant="ghost"
              >
                <IconDots className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
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
