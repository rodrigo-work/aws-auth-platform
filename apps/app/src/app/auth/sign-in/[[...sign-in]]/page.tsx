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
    <PageContainer scrollable={false}>
      {/* <div className="flex flex-1 flex-col space-y-4">
        <p>Example page of the repo</p>
      </div> */}

      <div className="flex min-h-[320px] w-full flex-col space-y-2 bg-amber-300 text-center">
        <h1 className="font-semibold text-2xl tracking-tight">{'title'}</h1>
        <p className="text-muted-foreground text-sm">{'description'}</p>
      </div>
    </PageContainer>
  )
}
