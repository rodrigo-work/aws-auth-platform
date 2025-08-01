'use client'

import { ActiveThemeProvider as ThemeProvider } from '@repo/design-system/hooks/use-active-theme'

export default function ActiveThemeProvider({
  activeThemeValue,
  children
}: {
  activeThemeValue: string
  children: React.ReactNode
}) {
  return (
    <ThemeProvider initialTheme={activeThemeValue}>{children}</ThemeProvider>
  )
}
