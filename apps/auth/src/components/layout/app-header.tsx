// import SearchInput from '../search-input'

import { Cta } from '@repo/design-system/components/cta'
import { ThemeSelector } from '@repo/design-system/components/theme-selector'
import { SidebarTrigger } from '@repo/design-system/components/ui/sidebar'
import { LanguageSwitcher } from '../language-switcher'
import { ModeToggle } from '../theme-toggle'

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-b-muted transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <Cta />
        </div>
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
        <div className="hidden md:flex">
          <LanguageSwitcher />
        </div>
        <div className="hidden md:flex">
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
}
