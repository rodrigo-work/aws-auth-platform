import { DataTableSkeleton } from '@repo/design-system/components/table/data-table-skeleton'
import { Separator } from '@repo/design-system/components/ui/separator'
import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import PageContainer from '@/components/layout/page-container'
import { PageHeader } from '@/features/components/page-header'
import { PrimaryButtons } from '@/features/components/primary-buttons'
import GroupsProvider from '@/features/context/groups-context'
import { GroupsDialogs } from '@/features/groups/components/groups-dialogs'
import GroupsListingPage from '@/features/groups/groups-listing'
import { searchParamsCache } from '@/lib/searchparams'

export const metadata: Metadata = {
  title: 'Groups of users',
  description: 'Manage groups of users (Server side table functionalities.)'
}

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function GroupsPage(props: PageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });
  return (
    <GroupsProvider>
      <PageContainer scrollable={false}>
        <div className="flex w-full flex-1 flex-col space-y-4">
          <PageHeader
            description={'Manage groups (Server side table functionalities.)'}
            title={'Groups'}
          >
            {/* <CardsChat datatable={users} /> */}
            <PrimaryButtons />
          </PageHeader>
          <Separator />
          <Suspense
            fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={10} />}
            // key={key}
          >
            <GroupsListingPage />
          </Suspense>
        </div>
      </PageContainer>

      <GroupsDialogs />
    </GroupsProvider>
  )
}
