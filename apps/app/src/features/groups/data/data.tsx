import { IconCalendar, IconShield, IconUserPin, IconUsersGroup } from '@tabler/icons-react'
import { CheckCircle } from 'lucide-react'

// import { UserEmailVerified, UserStatus } from './schema'

// export const callTypesUserEmailVerified = new Map<UserEmailVerified, string>([
//   ['true', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
//   [
//     'false',
//     'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'
//   ]
// ])

// export const callTypesUserStatus = new Map<UserStatus, string>([
//   // ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
//   // ['inactive', 'bg-neutral-300/40 border-neutral-300'],
//   // ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
//   [
//     'UNKNOWN',
//     'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'
//   ]
// ])

export const EMAIL_VERIFIED = [
  {
    label: 'TRUE',
    value: 'true'
  },
  {
    label: 'false',
    value: 'false'
  }
]

export const USER_STATUS = [
  {
    label: 'UNCONFIRMED',
    value: 'UNCONFIRMED-UNCONFIRMED'
  },
  {
    label: 'CONFIRMED-CONFIRMED',
    value: 'CONFIRMED'
  },
  {
    label: 'ARCHIVED-ARCHIVED',
    value: 'ARCHIVED'
  },
  {
    label: 'COMPROMISED-COMPROMISED',
    value: 'COMPROMISED'
  },
  {
    label: 'UNKNOWN-UNKNOWN',
    value: 'UNKNOWN'
  },
  {
    label: 'RESET_REQUIRED-RESET_REQUIRED',
    value: 'RESET_REQUIRED'
  },
  {
    label: 'FORCE_CHANGE_PASSWORD-FORCE_CHANGE_PASSWORD',
    value: 'FORCE_CHANGE_PASSWORD'
  }
]

export const groupTypes = [
  {
    value: 'superadmin',
    label: 'Backlog',
    icon: IconShield
  },
  {
    value: 'admin',
    label: 'Todo',
    icon: IconShield
  },
  {
    value: 'guest',
    label: 'In Progress',
    icon: IconUsersGroup
  },
  {
    value: 'editor',
    label: 'Done',
    icon: CheckCircle
  },
  {
    value: 'viewer',
    label: 'Canceled',
    icon: IconUserPin
  },
  {
    value: 'manager',
    label: 'Canceled',
    icon: IconCalendar
  }
]
