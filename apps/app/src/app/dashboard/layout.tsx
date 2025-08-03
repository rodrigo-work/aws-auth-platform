import { SidebarInset, SidebarProvider } from '@repo/design-system/components/ui/sidebar'
import type { Metadata } from 'next'
import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
}

type Props = {
  readonly children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
