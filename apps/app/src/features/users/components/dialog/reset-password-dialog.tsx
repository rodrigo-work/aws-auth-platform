'use client'

import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@repo/design-system/components/ui/alert'
import { Input } from '@repo/design-system/components/ui/input'
import { Label } from '@repo/design-system/components/ui/label'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useState } from 'react'
import { ConfirmDialog } from '../../../components/confirm-dialog'
import type { User } from '../../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function ResetPasswordDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleReset = () => {
    if (value.trim() !== 'reset') {
      return
    }

    onOpenChange(false)
    showSubmittedData(currentRow.sub, 'The following user has been deleted:')
  }

  return (
    <ConfirmDialog
      confirmText="Reset password"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to reset the password for{' '}
            <span className="font-bold italic">{currentRow.email}</span>?
          </p>
          <p className="mb-2">
            By continuing, you're confirming that the above user(s) will be reset their password.{' '}
            <span className="font-bold text-destructive">THIS CANNOT BE UNDONE.</span>
          </p>
        </div>
      }
      disabled={value.trim() !== 'reset'}
      handleConfirm={handleReset}
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle className="mr-1 inline-block stroke-destructive" size={18} />
          Reset password for user(s)
        </span>
      }
      type="destructive"
    >
      <div className="space-y-4">
        <Label className="my-4">
          <Input
            onChange={(e) => setValue(e.target.value)}
            placeholder="To confirm reset password for user(s), type reset"
            value={value}
          />
        </Label>
        <Alert className="my-6" variant="destructive">
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            Please be carefull, this operation can not be rolled back.
          </AlertDescription>
        </Alert>
        {/* {JSON.stringify(currentRow, null, 2)} */}
      </div>
    </ConfirmDialog>
  )
}
