'use client'
// import { ClerkProvider } from '@clerk/nextjs';
// import { dark } from '@clerk/themes';
// import { useTheme } from 'next-themes'
import { ActiveThemeProvider } from '@repo/ui/external/active-theme'
import React from 'react'

export default function Providers({
  // cookieIDP,
  activeThemeValue,
  children
}: {
  // cookieIDP: string
  activeThemeValue: string
  children: React.ReactNode
}) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  // const { resolvedTheme } = useTheme()

  return (
    <>
      {/* <UserProvider cookieIDP={cookieIDP}> */}
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        {/* <ClerkProvider
          appearance={{
            baseTheme: resolvedTheme === 'dark' ? dark : undefined
          }}
        > */}
        {children}
        {/* </ClerkProvider> */}
      </ActiveThemeProvider>
      {/* </UserProvider> */}
    </>
  )
}
