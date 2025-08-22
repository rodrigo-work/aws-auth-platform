import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { getUser } from '@/services'
import { Alert, AlertDescription, AlertTitle } from '@repo/design-system/components/ui/alert'
import { Separator } from '@repo/design-system/components/ui/separator'
import { getDictionary } from '@repo/internationalization'
import { createMetadata } from '@repo/seo/metadata'
import { AlertCircleIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { PasswordForm } from './components/password-form'
import { type Password, passwordSchema } from './schemas'

type ContactPageProps = {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async ({ params }: ContactPageProps): Promise<Metadata> => {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return createMetadata(dictionary.web.password.meta)
}

export default async function PasswordPage({ params }: ContactPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  const data = await getUser()
  const user: Password = passwordSchema.parse(data)

  if (user.username?.includes('google')) {
    return (
      <PageContainer scrollable={false}>
        <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
          <PageHeader description={'Manage your password settings.'} title={'Password'} />
          <Separator />
          <Alert className="my-8 font-semibold" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to process your payment.</AlertTitle>
            <AlertDescription>
              <p>Please verify your billing information and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check your card details</li>
                <li>Ensure sufficient funds</li>
                <li>Verify billing address</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer scrollable={true}>
      <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader
          description={dictionary.web.password.meta.description}
          title={dictionary.web.password.meta.title}
        />
        <Separator />
        <PageContent
          description={dictionary.web.password.contents[0].description}
          title={dictionary.web.password.contents[0].title}
        >
          {/* <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre> */}
          <PasswordForm attributes={user} dictionary={dictionary} />
        </PageContent>
      </div>
    </PageContainer>
  )
}
