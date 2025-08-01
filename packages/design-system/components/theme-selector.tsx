'use client'

import { Label } from '@repo/design-system/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@repo/design-system/components/ui/select'
import { useThemeConfig } from '@repo/design-system/hooks/use-active-theme'

const DEFAULT_THEMES = [
  {
    name: 'Default',
    value: 'default'
  },
  {
    name: 'Blue',
    value: 'blue'
  },
  {
    name: 'Green',
    value: 'green'
  },
  {
    name: 'Amber',
    value: 'amber'
  }
]

const SCALED_THEMES = [
  {
    name: 'Default',
    value: 'default-scaled'
  },
  {
    name: 'Blue',
    value: 'blue-scaled'
  }
]

const MONO_THEMES = [
  {
    name: 'Mono',
    value: 'mono-scaled'
  }
]

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
    <div className="flex items-center gap-2">
      <Label className="sr-only" htmlFor="theme-selector">
        Theme
      </Label>
      <Select onValueChange={setActiveTheme} value={activeTheme}>
        <SelectTrigger
          className="justify-start *:data-[slot=select-value]:w-12"
          id="theme-selector"
        >
          <span className="hidden text-muted-foreground sm:block">Select a theme:</span>
          <span className="block text-muted-foreground sm:hidden">Theme</span>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Scaled</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            {MONO_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
