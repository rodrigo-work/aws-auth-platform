import { Separator } from '@repo/design-system/components/ui/separator'
import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { getUser } from '../actions'
import { AccountForm } from './components/account-form'
import { type User, userSchema } from './schemas/account'

export default async function AccountPage() {
  const data = await getUser()
  const user: User = userSchema.parse(data)

  return (
    <PageContainer scrollable={true}>
      <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader description={'Manage your account settings.'} title={'Account'} />
        <Separator />
        <PageContent description="Identity and display information" title="Account information">
          <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
          <AccountForm profile={user.profile} />
        </PageContent>
      </div>
    </PageContainer>
  )
}
