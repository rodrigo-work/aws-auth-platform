'use client'

import type { Profile } from '@/types/profile'
import React, { createContext, useContext } from 'react'

export const UserContext = createContext<Profile | undefined>(undefined)

export const UserProvider = ({
  children,
  cookieIDP
}: {
  children: React.ReactNode
  cookieIDP: string
}) => {
  let profileData: Profile | undefined

  try {
    // const token = cookieIDP.split('.')[1] ?? ''
    // // const decode: Profile = JSON.parse(
    // //   Buffer.from(token, 'base64').toString('utf8') ?? '{}'
    // // )

    // const decode: Profile =
    //   Buffer.from(token, 'base64').toString('utf8') ?? '{}'

    // const re = JSON.parse(decode)
    // profileData = re

    // console.log('profileData', profileData)
    const token = cookieIDP.split('.')[1] ?? ''

    // Usa o atob (disponível no client) em vez de Buffer (do Node.js)
    const decoded = atob(token) // base64 -> string JSON
    profileData = JSON.parse(decoded) as Profile
  } catch (error) {
    console.error('Error parsing IDP cookie', error)
  }

  return (
    <UserContext.Provider value={profileData}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
