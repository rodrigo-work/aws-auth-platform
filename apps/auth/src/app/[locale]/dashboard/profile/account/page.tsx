import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { Separator } from '@repo/design-system/components/ui/separator'
import { getDictionary } from '@repo/internationalization'
import { createMetadata } from '@repo/seo/metadata'
import type { Metadata } from 'next'
import { getUser } from './actions'
import { AccountForm } from './components/account-form'
import { type Account, accountSchema } from './schemas/account'

type ContactPageProps = {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async ({ params }: ContactPageProps): Promise<Metadata> => {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return createMetadata(dictionary.web.home.meta)
}

export default async function AccoubtPage({ params }: ContactPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  const data = await getUser()
  const user: Account = accountSchema.parse(data)

  return (
    <PageContainer scrollable={true}>
      <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader
          description={dictionary.web.account.meta.description}
          title={dictionary.web.account.meta.title}
        />
        <Separator />
        <PageContent description="Identity and display information" title="Account information">
          {/* <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre> */}
          <AccountForm attributes={user} />
        </PageContent>
      </div>
    </PageContainer>
  )
}
