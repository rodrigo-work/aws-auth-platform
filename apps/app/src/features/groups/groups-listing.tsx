import { searchParamsCache } from '@/lib/searchparams'
import { getAllGroups, getAllUsers } from '../actions'
import { columns } from './components/data-table-columns'
import { GroupsTable } from './components/groups-table'
import { type Groups, groupsSchema, type Users, usersSchema } from './data/schema'

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
  // const groups: Groups = data.data
  const groups: Groups = groupsSchema.parse(data.data)

  const dataUsers = await getAllUsers(filters)
  // const total = data.total
  // const users: Users = dataUsers.data

  const users: Users = usersSchema.parse(dataUsers.data)

  return (
    <>
      {/* <code>{JSON.stringify(users, null, 2)}</code> */}
      <GroupsTable columns={columns} data={groups} totalItems={total} />
    </>
  )
}
