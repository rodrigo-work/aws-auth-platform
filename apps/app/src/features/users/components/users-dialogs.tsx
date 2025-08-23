'use client'

import { useUsers } from '../context/users-context'
import { DeleteDialog, EnableDisableDialog, ResetPasswordDialog } from './dialog'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      {/* <GroupsDialogAction
        key="user-add"
        onOpenChange={() => setOpen('add')}
        open={open === 'add'}
      /> */}

      {currentRow && (
        <>
          <EnableDisableDialog
            currentRow={currentRow}
            key={`enable-disable-user-${currentRow}`}
            onOpenChange={() => {
              setOpen('enable-disable-user')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'enable-disable-user'}
          />

          <DeleteDialog
            currentRow={currentRow}
            key={`user-delete-${currentRow}`}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'delete'}
          />

          <ResetPasswordDialog
            currentRow={currentRow}
            key={`reset-password-${currentRow}`}
            onOpenChange={() => {
              setOpen('reset-password')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'reset-password'}
          />
        </>
      )}
    </>
  )
}
