import PageContainer from '@/components/layout/page-container'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { Heading } from '@repo/ui/external/heading'
import { DataTable } from '@repo/ui/external/table/data-table'
import { IconPlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { columns } from './data/columns'

export const metadata: Metadata = {
  title: 'Dashboard: Users',
  description: 'User management'
}

async function getUsers() {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)

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
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Users" description="User management" />
          <Link href="#" className={cn(buttonVariants(), 'text-xs md:text-sm')}>
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <DataTable data={users} columns={columns} />
      </div>
    </PageContainer>
  )
}
