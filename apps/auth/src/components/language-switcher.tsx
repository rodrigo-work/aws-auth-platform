'use client'

import { Label } from '@repo/design-system/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/design-system/components/ui/select'
import { cn } from '@repo/design-system/lib/utils'
import { locales } from '@repo/internationalization'
import { Languages } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type LanguageSwitcherProps = {
  compact?: boolean
}

const languageMap = new Map([
  ['en', { emoji: '🇺🇸', name: 'English' }],
  ['es', { emoji: '🇪🇸', name: 'Español' }],
  ['de', { emoji: '🇩🇪', name: 'Deutsch' }],
  ['zh', { emoji: '🇨🇳', name: '中文' }],
  ['fr', { emoji: '🇫🇷', name: 'Français' }],
  ['pt', { emoji: '🇧🇷', name: 'Português' }]
])

export const LanguageSwitcher = ({ compact }: LanguageSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [selectedLanguage, setSelectedLanguage] = useState((params.locale as string) || 'en')

  const switchLanguage = (locale: string) => {
    const defaultLocale = 'en'
    let newPathname = pathname

    // Case 1: If current locale is default and missing from the URL
    if (!pathname.startsWith(`/${params.locale}`) && params.locale === defaultLocale) {
      // Add the default locale to the beginning to normalize
      newPathname = `/${params.locale}${pathname}`
    }

    // Replace current locale with the selected one
    newPathname = newPathname.replace(`/${params.locale}`, `/${locale}`)
    // console.log(newPathname)

    router.push(newPathname)
  }

  const handleSelectChange = (locale: string) => {
    setSelectedLanguage(locale)
    switchLanguage(locale)
  }

  return (
    <div className="flex items-center gap-2">
      <Label className="sr-only" htmlFor="theme-selector">
        Language
      </Label>
      <Select onValueChange={handleSelectChange} value={selectedLanguage}>
        <SelectTrigger
          className={cn(
            'justify-start',
            compact ? '*:data-[slot=select-value]:w-12' : '*:data-[slot=select-value]:w-22'
          )}
          id="theme-selector"
        >
          <span className='"idden text-muted-foreground sm:block'>
            {compact ? <Languages className="h-[1.2rem] w-[1.2rem]" /> : 'Select a language:'}
          </span>
          <span className="block text-muted-foreground sm:hidden">Language</span>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            {locales.map((item) => {
              const { name, emoji } = languageMap.get(item) as any
              return (
                <SelectItem key={item} value={item}>
                  {emoji} {name}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
