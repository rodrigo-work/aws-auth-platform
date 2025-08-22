'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@repo/design-system/components/ui/sidebar'
import { IconChevronLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { useSidebarTransition } from '@/hooks/use-sidebar-transition'

export function NavSettings() {
  const { toggle } = useSidebarTransition()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={'#'} onClick={() => toggle()}>
            <IconChevronLeft /> Main menu
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
