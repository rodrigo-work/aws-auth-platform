import { DataTableSkeleton } from './data/data-table-skeleton'

export default function Loading() {
  return (
    <>
      <DataTableSkeleton columnCount={4} rowCount={10} filterCount={0} />
    </>
  )
}
