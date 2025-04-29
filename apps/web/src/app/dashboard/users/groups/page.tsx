import { DataTable } from '@repo/ui/external/table/data-table'
import { notFound } from 'next/navigation'
import { columns } from './data/columns'

async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`)

  if (!result.ok) {
    throw new Error('Something went wrong!')
  }

  const users = await result.json()

  if (users.length === 0) {
    notFound()
  }

  return users
}

export default async function UsersPage() {
  const { data: users } = await getUsers()

  return (
    <>
      <DataTable data={users} columns={columns} />
    </>
  )
}
