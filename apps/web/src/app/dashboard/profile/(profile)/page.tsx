'use client'

import { Separator } from '@repo/ui/components/separator'
import { ProfileForm } from './profile-form'

export default function SettingsProfilePage() {
  // const user = useUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      {/* {JSON.stringify(user)} */}
      <Separator />
      <ProfileForm />
    </div>
  )
}
