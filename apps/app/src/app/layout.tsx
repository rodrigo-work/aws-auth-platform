import { DesignSystemProvider } from '@repo/design-system'
import { cn } from '@repo/design-system/lib/utils'
import { fontVariables } from '@/lib/font'
import '@repo/design-system/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
}

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
}

type RootLayoutProps = {
  readonly children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get('active_theme')?.value
  const isScaled = activeThemeValue?.endsWith('-scaled')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'overflow-hidden overscroll-none bg-background font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <DesignSystemProvider activeThemeValue={activeThemeValue}>
            {children}
          </DesignSystemProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
