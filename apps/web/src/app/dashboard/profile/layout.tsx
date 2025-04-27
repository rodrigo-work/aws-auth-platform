import PageContainer from '@/components/layout/page-container'
import { Separator } from '@repo/ui/components/separator'
import { Heading } from '@repo/ui/external/heading'
// import { DataTableSkeleton } from '@repo/ui/components/table/data-table-skeleton';
// import ProductListingPage from '@/features/products/components/product-listing';
// import { searchParamsCache, serialize } from '@/lib/searchparams';
import { ScrollArea } from '@repo/ui/components/scroll-area'
import { SidebarNav } from './sidebar-nav'
// import { SearchParams } from 'nuqs/server';
// import { Suspense } from "react";

export const metadata = {
  title: 'Dashboard: Profile'
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/dashboard/profile'
  },
  {
    title: 'Account',
    href: '/dashboard/profile/account'
  },
  {
    title: 'Appearance',
    href: '/dashboard/profile/appearance'
  },
  {
    title: 'Notifications',
    href: '/dashboard/profile/notifications'
  },
  {
    title: 'Display',
    href: '/dashboard/profile/display'
  }
]

export default async function SettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Settings"
            description="Manage your account settings and set e-mail preferences"
          />
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <ScrollArea className="h-180 w-full">
            <div className="flex-1 lg:max-w-2xl mb-20">{children}</div>
          </ScrollArea>
        </div>
        {/* <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ProductListingPage />
        </Suspense> */}
      </div>
    </PageContainer>
  )
}
