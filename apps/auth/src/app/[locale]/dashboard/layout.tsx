import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@repo/design-system/components/ui/sidebar'
import type { Metadata } from 'next'

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
        {process.env.NODE_ENV === 'development' && <AppHeader />}
        <div className="flex flex-col px-6 py-6">
          <div className="rounded-xl bg-white dark:bg-transparent">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
