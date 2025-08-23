import { searchParamsCache } from '@/lib/searchparams'
import { getAllGroups } from '../actions'
import { columns } from './components/data-table-columns'
import { GroupsTable } from './components/groups-table'
import type { Groups } from './data/schema'

export default async function GroupsListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page')
  const limit = searchParamsCache.get('limit')
  const search = searchParamsCache.get('search')

  const filters = {
    page,
    limit,
    ...(search && { search })
  }

  const data = await getAllGroups(filters)
  const total = data.total
  const groups: Groups = data.data
  // const groups: Groups = groupsSchema.parse(data.data)

  return (
    <>
      {/* <code>{JSON.stringify(groups, null, 2)}</code> */}
      <GroupsTable columns={columns} data={groups} totalItems={total} />
    </>
  )
}
