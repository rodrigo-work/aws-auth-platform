export const userStatus = [
  {
    value: 'COMPROMISED',
    label: 'COMPROMISED',
    color: 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
    roles: ['admin', 'superuser', 'manage_system']
  },
  {
    value: 'UNCONFIRMED',
    label: 'UNCONFIRMED',
    color: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
    roles: ['user', 'access_basic_features']
  },
  {
    value: 'FORCE_CHANGE_PASSWORD',
    label: 'CPASSWORD',
    color: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
    roles: ['guest', 'read_only']
  },
  {
    value: 'DISABLED',
    label: 'DISABLED',
    color:
      'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    roles: ['moderate_content', 'manage_users_limited']
  },
  {
    value: 'CONFIRMED',
    label: 'CONFIRMED',
    color: 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
    roles: ['moderate_content', 'manage_users_limited']
  },
  {
    label: 'RESET REQUIRED',
    value: 'RESET_REQUIRED',
    color: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'
  },
  {
    value: 'UNKNOWN',
    label: 'UNKNOWN',
    roles: ['access_dev_tools', 'view_logs', 'manage_api']
  },
  {
    value: 'ARCHIVED',
    label: 'ARCHIVED',
    color: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
    roles: ['access_dev_tools', 'view_logs', 'manage_api']
  }
]
