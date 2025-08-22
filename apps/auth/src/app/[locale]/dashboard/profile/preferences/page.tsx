import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { getUser } from '@/services'
import { Separator } from '@repo/design-system/components/ui/separator'
import { AppearanceForm } from './components/preferences-form'
import { type Appearance, appearanceSchema } from './schemas/appearance'

export default async function PreferencesPage() {
  const data = await getUser()
  const user: Appearance = appearanceSchema.parse(data)

  return (
    <PageContainer scrollable={true}>
      <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader description={'Manage your preferences settings.'} title={'Preferences'} />
        <Separator />
        <PageContent description="Identity and display information" title="Preferences ">
          {/* <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre> */}
          <AppearanceForm attributes={user} />
        </PageContent>
      </div>
    </PageContainer>
  )
}
