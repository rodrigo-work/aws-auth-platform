import { searchParamsCache } from '@/lib/searchparams'
import { getAllUsers } from '../actions'
import { columns } from './components/data-table-columns'
import { UsersTable } from './components/users-table'
import { type Users, usersSchema, usersSchema2 } from './data/schema'

export default async function UsersListingPage() {
  // Showcasing the use of search params cache in nested RSCs
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
  //    const users: Users = data.data
  const users: Users = usersSchema.parse(data.data)
  // const usergroup: Users = usersSchema2.parse(data.data)

  return (
    <>
      {/* <pre className="mt-2 h-[160px] w-[340px] overflow-x-auto overflow-y-scroll rounded-md bg-slate-950 p-4"> */}
      {/* <code className="text-xs">{JSON.stringify(usergroup, null, 2)}</code> */}
      {/* </pre> */}
      <UsersTable columns={columns} data={users} totalItems={total} />
    </>
  )
}
