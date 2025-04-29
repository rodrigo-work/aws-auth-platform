import PageContainer from '@/components/layout/page-container'
import { searchParamsCache } from '@/lib/searchparams'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { Heading } from '@repo/ui/external/heading'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { SearchParams } from 'nuqs/server'

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
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Home" description="Home page of the repo" />
          <Link href="#" className={cn(buttonVariants(), 'text-xs md:text-sm')}>
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <p>Example page of the repo</p>
      </div>
    </PageContainer>
  )
}
