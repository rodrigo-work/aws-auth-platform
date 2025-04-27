import PageContainer from '@/components/layout/page-container'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { Heading } from '@repo/ui/external/heading'
import { IconPlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard: Users',
  description: 'User management'
}

export default async function UsersPage({
  children
}: {
  children: React.ReactNode
}) {
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
        {children}
      </div>
    </PageContainer>
  )
}
