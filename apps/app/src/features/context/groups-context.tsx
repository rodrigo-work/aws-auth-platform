'use client'

import React, { useState } from 'react'
import useDialogState from '../hooks/use-dialog-state'
import type { User } from '../users/data/schema'

type GroupsDialogType = 'add' | 'edit' | 'delete' | 'enable-disable-user' | 'reset-password'

interface GroupsContextType {
  open: GroupsDialogType | null
  setOpen: (str: GroupsDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const GroupsContext = React.createContext<GroupsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function GroupsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<GroupsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <GroupsContext value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</GroupsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGroups = () => {
  const groupsContext = React.useContext(GroupsContext)

  if (!groupsContext) {
    throw new Error('useGroups has to be used within <GroupsContext>')
  }

  return groupsContext
}
