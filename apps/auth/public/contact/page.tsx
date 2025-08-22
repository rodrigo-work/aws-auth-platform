import { Separator } from '@repo/design-system/components/ui/separator'

import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { getUser } from '../actions'
import { ContactEmailForm } from './components/contact-email-form'
import { ContactPhoneForm } from './components/contact-phone-form'
import { type ContactPhone, contactPhoneSchema } from './schemas/contact-phone-schema'

export default async function ContactPage() {
  const data = await getUser()
  const user: ContactPhone = contactPhoneSchema.parse(data)

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader description={'Manage your contact settings.'} title={'Contact'} />
        <Separator />
        <PageContent description="Identity and display information" title="Contact information">
          <ContactEmailForm attributes={user} />
        </PageContent>
        <PageContent description="Identity and display information" title="Contact information">
          <ContactPhoneForm attributes={user} />
        </PageContent>
      </div>
    </PageContainer>
  )
}
