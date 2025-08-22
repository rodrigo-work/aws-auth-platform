import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { getUser } from '@/services'
import { Alert, AlertDescription, AlertTitle } from '@repo/design-system/components/ui/alert'
import { Separator } from '@repo/design-system/components/ui/separator'
import { AlertCircleIcon } from 'lucide-react'
import { MfaForm } from './components/mfa-form'
import { type Account, accountSchema } from './schemas'

export default async function AccountPage() {
  const data = await getUser()
  const user: Account = accountSchema.parse(data)

  if (user.username?.includes('google')) {
    return (
      <PageContainer scrollable={true}>
        <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
          <PageHeader
            description={'Manage your authentication settings.'}
            title={'Authentication'}
          />
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
        <PageHeader description={'Manage your authentication settings.'} title={'Authentication'} />
        <Separator />
        <PageContent
          description="Identity and display information"
          title="Authentication information"
        >
          {/* <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre> */}
          <MfaForm attributes={user} />
        </PageContent>
      </div>
    </PageContainer>
  )
}
