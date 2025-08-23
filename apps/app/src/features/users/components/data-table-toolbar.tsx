'use client'

import { DataTableFacetedFilter } from '@repo/design-system/components/table/data-table-faceted-filter'
import { DataTableViewOptions } from '@repo/design-system/components/table/data-table-view-options'
import { Button } from '@repo/design-system/components/ui/button'
import { Input } from '@repo/design-system/components/ui/input'
import type { Table } from '@tanstack/react-table'
import * as React from 'react'
import { userStatus } from '../data/data'

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  )

  const onReset = React.useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  const rows = table.getRowModel().rows

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          placeholder="Filter users..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        />
        <div className="flex gap-x-2">
          {columns.map((column) => {
            if (column.id === 'user_status') {
              const counts: Record<string, number> = {}

              for (const row of table.getPreFilteredRowModel().rows) {
                const { enabled, user_status }: any = row.original
                const status = enabled ? 'DISABLED' : user_status
                if (!status) {
                  continue
                }
                counts[status] = (counts[status] || 0) + 1
              }
              const optionsWithCount = userStatus.map((option) => ({
                ...option,
                label: `${option.label} (${counts[option.value] ?? 0})`
              }))
              return (
                <DataTableFacetedFilter
                  column={column} // Evita conflito de chave
                  key={'user_status-filter'}
                  multiple
                  options={optionsWithCount ?? []}
                  title={column.columnDef.meta?.label ?? column.id}
                />
              )
            }
            return null // or return undefined;

            // Filtro padrão para outras colunas
            // return <DataTableToolbarFilter column={column} key={column.id} />
          })}
        </div>

        {isFiltered && (
          <Button
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
            variant="ghost"
          >
            Reset
            {/* <Cross2Icon className="ml-2 h-4 w-4" /> */}
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
