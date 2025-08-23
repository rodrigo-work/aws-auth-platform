import type { SearchParams } from 'nuqs/server'
import PageContainer from '@/components/layout/page-container'
import { searchParamsCache } from '@/lib/searchparams'

export const metadata = {
  title: 'Dashboard: Home',
  description: 'Home page of the repo'
}

type pageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={true}>
      <div className="mx-auto max-w-6xl">
        Home
        {/* <ApiKeysSection /> */}
      </div>
    </PageContainer>
  )
}
