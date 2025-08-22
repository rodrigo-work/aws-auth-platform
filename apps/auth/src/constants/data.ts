import type { NavItem } from '@/types'

export const COOKIES_NAME = {
  idToken: 'id_token',
  accessToken: 'access_token',
  refreshToken: 'refresh_token'
} as const

export const ALLOWED_RETURN_HOSTNAMES = [
  'app.localhost:3000',
  'admin.localhost:3002',
  'app.rodrigo.work',
  'admin.rodrigo.work'
  // adicione outros domínios das apps que vão autenticar
]

export const languages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Chinese', value: 'zh' }
] as const

export const SETTINGS = {
  NAME: 'Auth Platform',
  title: 'Auth Platform',
  description: 'Advanced Authentication Platform with Amazon Cognito'
}

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navMain: NavItem[] = [
  {
    label: 'Dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: true,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Settings',
    url: '',
    icon: 'settings'
  }
]

export const navAccount: NavItem[] = [
  {
    title: 'Account',
    url: '/dashboard/profile/account',
    icon: 'user'
  },
  {
    title: 'Preferences',
    url: '/dashboard/profile/preferences',
    icon: 'settings',
    isActive: true
  }

  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
]

export const navSecurityAndAccess: NavItem[] = [
  {
    title: 'Password',
    url: '/dashboard/security/password',
    icon: 'password'
  },
  {
    title: 'Authentication',
    url: '/dashboard/security/mfa',
    icon: 'auth2fa'
  }
]

export const navSecondary: NavItem[] = [
  {
    title: 'Documentation',
    url: '/dashboard/docs',
    icon: 'documentation'
  }
]
