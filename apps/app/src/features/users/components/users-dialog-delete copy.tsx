'use client'

import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@repo/design-system/components/ui/alert'
import { Input } from '@repo/design-system/components/ui/input'
import { Label } from '@repo/design-system/components/ui/label'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useState } from 'react'
import type { User } from '../data/schema'
// import { ConfirmDialog } from './ConfirmDialog'
import { ConfirmDialog } from './ConfirmDialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function GroupsDialogDelete({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== 'Delete') {
      return
    }

    onOpenChange(false)
    showSubmittedData(currentRow, 'The following user has been deleted:')
  }

  return (
    <ConfirmDialog
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{' '}
            {/* <span className="font-bold">{currentRow.name.toLocaleUpperCase()}</span>? */}
          </p>
          <p className="mb-2">
            By continuing, you're confirming that the above group(s) will be permanently deleted.{' '}
            <span className="font-bold text-destructive">THIS CANNOT BE UNDONE.</span>
          </p>

          <Label className="my-4">
            <Input
              onChange={(e) => setValue(e.target.value)}
              placeholder="To confirm group deletion, type Delete"
              value={value}
            />
          </Label>
          <Alert className="my-6" variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      disabled={value.trim() !== 'Delete'}
      handleConfirm={handleDelete}
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="text-destructive">
          <IconAlertTriangle className="mr-1 inline-block stroke-destructive" size={18} /> Delete
          group
        </span>
      }
      type="destructive"
    />
  )
}

export function UserDialogEnableDisable({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleEnableDisable = () => {
    // if (value.trim() !== currentRow.name.toLocaleUpperCase()) {
    //   return
    // }

    currentRow.enabled = !currentRow.enabled

    const data = {
      username: currentRow.sub,
      enabled: currentRow.enabled
    }

    onOpenChange(false)
    showSubmittedData(data, 'The following user has been deleted:')
  }

  return (
    <ConfirmDialog
      // confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to {currentRow.enabled ? 'disable' : 'enable'}{' '}
            {/* <span className="font-bold">{currentRow.name.toLocaleUpperCase()}</span>? */}
          </p>
          <p className="mb-2">
            By continuing, you're confirming that the above user(s) will be{' '}
            {currentRow.enabled ? 'disabled' : 'enabled'}.
          </p>

          <Label className="my-4">
            <Input
              onChange={(e) => setValue(e.target.value)}
              // placeholder={`To continue, type ${currentRow.name.toLocaleUpperCase()}`}
              // value={currentRow.name.toLocaleUpperCase()}
            />
          </Label>
          <Alert className="my-6 flex flex-col text-yellow-500">
            <AlertTitle>
              <IconAlertTriangle className="mr-1 inline-block stroke-text-yellow-500" size={24} />
              Warning!
            </AlertTitle>
            <AlertDescription className="text-yellow-500">
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      // disabled={value.trim() !== currentRow.name.toLocaleUpperCase()}
      handleConfirm={handleEnableDisable}
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="mb-8 text-bold">
          {/* <IconAlertTriangle className="mr-1 inline-block stroke-text-yellow-500" size={16} />{' '} */}
          {currentRow.enabled ? 'Disable' : 'Enable'} User
        </span>
      }
      type={'info'}
    />
  )
}

export function UserDialogResetPassword({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleEnableDisable = () => {
    // if (value.trim() !== currentRow.name.toLocaleUpperCase()) {
    //   return
    // }

    currentRow.enabled = !currentRow.enabled

    const data = {
      username: currentRow.sub,
      password: value
    }

    onOpenChange(false)
    showSubmittedData(data, 'The following user has been deleted:')
  }

  return (
    <ConfirmDialog
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to {currentRow.enabled ? 'disable' : 'enable'}{' '}
            {/* <span className="font-bold">{currentRow.name.toLocaleUpperCase()}</span>? */}
          </p>
          <p>
            By continuing, you're confirming that the above user(s) will be{' '}
            {currentRow.enabled ? 'disabled' : 'enabled'}.
          </p>
        </div>
      }
      // disabled={value.trim() !== currentRow.name.toLocaleUpperCase()}
      handleConfirm={handleEnableDisable}
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="text-blue-500">
          <IconAlertTriangle className="mr-1 inline-block stroke-text-blue-500" size={32} />{' '}
          {currentRow.enabled ? 'Disable' : 'Enable'} User
        </span>
      }
      // confirmText="Delete"
      type="warning"
    >
      <div className="space-y-4--">
        <Label className="my-4--">
          <Input
            onChange={(e) => setValue(e.target.value)}
            // placeholder={`To continue, type ${currentRow.name.toLocaleUpperCase()}`}
            // value={currentRow.name.toLocaleUpperCase()}
          />
        </Label>
        <Alert className="my-6 text-blue-500">
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription className="text-blue-500">
            Please be carefull, this operation can not be rolled back.
          </AlertDescription>
        </Alert>
      </div>
    </ConfirmDialog>
  )
}
