'use client'

import { useSidebarTransition } from '@/hooks/use-sidebar-transition'
import type { NavItem } from '@/types'
import { Icons } from '@repo/design-system/components/icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@repo/design-system/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger
} from '@repo/design-system/components/ui/sidebar'
import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation({ navItems, group }: { navItems: NavItem[]; group?: string }) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  const { toggle } = useSidebarTransition()

  return (
    <SidebarGroup>
      {group && <SidebarGroupLabel>{group}</SidebarGroupLabel>}
      <SidebarMenu>
        {navItems.map((item) => {
          const Icon = item.icon ? Icons[item.icon] : Icons.logo
          const isSettings = item.title === 'Settings'
          const isDashboard = item.title === 'Dashboard'

          const content = (
            <>
              {isDashboard ? (
                <span className="flex w-full flex-row items-center gap-2">
                  <span className="flex-1">
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.replace(`/${locale}`, '') === item.url}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </span>
                  <span>
                    <SidebarTrigger />
                  </span>
                </span>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.replace(`/${locale}`, '') === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url} onClick={toggle}>
                      {item.icon && <Icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </>
          )

          return item?.items && item?.items?.length > 0 ? (
            <Collapsible
              asChild
              className="group/collapsible"
              defaultOpen={item.isActive}
              key={item.title}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={pathname.replace(`/${locale}`, '') === item.url}
                    tooltip={item.title}
                  >
                    {item.icon && <Icon />}
                    <span>{item.title}</span>
                    <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname.replace(`/${locale}`, '') === subItem.url}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <span key={item.title}>
              {isSettings || isDashboard ? (
                <span>{content}</span>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.replace(`/${locale}`, '') === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      {item.icon && <Icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </span>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
