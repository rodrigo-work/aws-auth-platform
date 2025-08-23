import { searchParamsCache } from '@/lib/searchparams'
import { getAllUsers } from '../actions'
import { columns } from './components/data-table-columns'
import { UsersTable } from './components/users-table'
import type { Users } from './data/schema'

export default async function UsersListingPage() {
  const page = searchParamsCache.get('page')
  const limit = searchParamsCache.get('limit')
  const search = searchParamsCache.get('search')

  const filters = {
    limit,
    page,
    ...(search && { search })
  }

  const data = await getAllUsers(filters)
  const total = data.total
  const users: Users = data.data
  // const users: Users = usersSchema.parse(data.data)

  return <UsersTable columns={columns} data={users} totalItems={total} />
}
