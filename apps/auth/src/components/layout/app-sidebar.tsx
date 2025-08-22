'use client'

import { navAccount, navMain, navSecondary, navSecurityAndAccess, SETTINGS } from '@/constants/data'
import { SidebarTransitionProvider, useSidebarTransition } from '@/hooks/use-sidebar-transition'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@repo/design-system/components/ui/sidebar'
import { cn } from '@repo/design-system/lib/utils'
import { IconShieldHalfFilled } from '@tabler/icons-react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { NavSecondary } from './nav/nav-secondary'
import { NavSettings } from './nav/nav-settings'
import { Navigation } from './nav/navigation'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarTransitionProvider>
      <Sidebar collapsible="icon" variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <IconShieldHalfFilled className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">{SETTINGS.NAME}</span>
                    <span className="truncate text-xs">{SETTINGS.description}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="overflow-x-hidden">
          <SidebarContentTransition />
          <NavSecondary className="mt-auto" items={navSecondary} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="flex flex-row items-center justify-end gap-2">
                <Link href={'/auth/logout'}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        {/* <SidebarRail /> */}
      </Sidebar>
    </SidebarTransitionProvider>
  )
}

function SidebarContentTransition() {
  const { showSecond } = useSidebarTransition()

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-start transition-transform duration-500 ease-in-out',
          showSecond ? '-translate-x-full' : 'translate-x-0'
        )}
        style={{ zIndex: showSecond ? 0 : 10 }}
      >
        <NavSettings />
        <Navigation group="Account Settings" navItems={navAccount} />
        <Navigation group="Security & Access" navItems={navSecurityAndAccess} />
      </div>
      <div
        className={cn(
          'absolute inset-0 flex flex-col transition-transform duration-500 ease-in-out',
          showSecond ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ zIndex: showSecond ? 10 : 0 }}
      >
        <Navigation navItems={navMain} />
      </div>
    </div>
  )
}
