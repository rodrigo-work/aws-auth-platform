import { IconShield, IconUsersGroup } from '@tabler/icons-react'

export const groupTypes = [
  {
    value: 'Administrator',
    icon: IconShield,
    roles: ['admin', 'superuser', 'manage_system']
  },
  {
    value: 'User',
    icon: IconUsersGroup,
    roles: ['user', 'access_basic_features']
  },
  {
    value: 'Guest',
    icon: IconUsersGroup,
    roles: ['guest', 'read_only']
  },
  {
    value: 'Moderator',
    icon: IconUsersGroup,
    roles: ['moderate_content', 'manage_users_limited']
  },
  {
    value: 'Developer',
    icon: IconUsersGroup,
    roles: ['access_dev_tools', 'view_logs', 'manage_api']
  },
  {
    value: 'Support',
    icon: IconUsersGroup,
    roles: ['view_tickets', 'manage_support_cases']
  },
  {
    value: 'Auditor',
    icon: IconUsersGroup,
    roles: ['view_audit_logs', 'read_sensitive_data']
  },
  {
    value: 'Manager',
    icon: IconUsersGroup,
    roles: ['manage_team', 'view_reports']
  },
  {
    value: 'Finance',
    icon: IconUsersGroup,
    roles: ['view_billing', 'manage_invoices']
  },
  {
    value: 'HR',
    icon: IconUsersGroup,
    roles: ['manage_employees', 'view_personal_data']
  },
  {
    value: 'API Client',
    icon: IconUsersGroup,
    roles: ['api_access', 'token_authentication']
  }
]
