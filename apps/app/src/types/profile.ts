/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Profile {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  session_state: string
  acr: string
  realm_access: RealmAccess
  resource_access: ResourceAccess
  scope: string
  sid: string
  email_verified: boolean
  userRealmRole: string[]
  name: string
  preferred_username: string
  groupMembership: any[]
  given_name: string
  family_name: string
  email: string
}

export interface RealmAccess {
  roles: string[]
}

export interface ResourceAccess {
  account: Account
}

export interface Account {
  roles: string[]
}
