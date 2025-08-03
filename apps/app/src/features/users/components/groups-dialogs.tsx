'use client'

import { useGroups } from '../../context/groups-context'
import { GroupsDialogDelete, GroupsDialogResetPassword } from './dialog'

export function GroupsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useGroups()
  return (
    <>
      {/* <GroupsDialogAction
        key="user-add"
        onOpenChange={() => setOpen('add')}
        open={open === 'add'}
      /> */}

      {currentRow && (
        <>
          <GroupsDialogDelete
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

          <GroupsDialogResetPassword
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

          {/* <UserDialogEnableDisable
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

     */}
        </>
      )}
    </>
  )
}
