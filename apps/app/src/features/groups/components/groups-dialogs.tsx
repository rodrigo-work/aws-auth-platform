'use client'

import { useGroups } from '../context/groups-context'
import { GroupsDialogAction } from './groups-dialog-action'

export function GroupsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useGroups()
  return (
    <>
      <GroupsDialogAction
        key="user-add"
        onOpenChange={() => setOpen('add')}
        open={open === 'add'}
      />
      {/*
      <UsersInviteDialog
        key="user-invite"
        onOpenChange={() => setOpen('invite')}
        open={open === 'invite'}
      /> */}

      {currentRow && (
        <>
          {/* <GroupsDialogAction
            currentRow={currentRow}
            key={`user-edit-${currentRow.name}`}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'edit'}
          /> */}
          {/* <GroupsDialogDelete
            currentRow={currentRow}
            key={`user-delete-${currentRow}`}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'delete'}
          />*/}
        </>
      )}
    </>
  )
}
