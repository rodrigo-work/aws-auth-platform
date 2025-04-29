import PageContainer from '@/components/layout/page-container'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { Heading } from '@repo/ui/external/heading'
import { DataTable } from '@repo/ui/external/table/data-table'
import { IconPlus } from '@tabler/icons-react'
import { promises as fs } from 'fs'
import { Metadata } from 'next'
import Link from 'next/link'
import path from 'path'
import { z } from 'zod'
import { columns } from './data/columns'
import { taskSchema } from './data/schema'

export const metadata: Metadata = {
  title: 'Dashboard: Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/dashboard/tasks/data/tasks.json')
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <PageContainer scrollable={true}>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Tasks"
              description="A task and issue tracker build using Tanstack Table."
            />
            <Link
              href="/dashboard/tasks/new"
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <IconPlus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
          {/* <Suspense
            // key={key}
            fallback={<DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />}
          > */}
          <DataTable data={tasks} columns={columns} />
          {/* </Suspense> */}
        </div>
      </PageContainer>
      {/* <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>Here&apos;s a list of your tasks for this month!</p>
          </div>
          <div className='flex items-center space-x-2'>
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div> */}
    </>
  )
}
