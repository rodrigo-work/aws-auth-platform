import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
}

type DashboardLayoutLayoutProps = {
  readonly children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutLayoutProps) {
  return <>{children}</>
}
