'use client'

import { languages } from '@/constants/data'
import { OmitParser } from '@/lib/omit'
import { updateUser } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar'
import { Button } from '@repo/design-system/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@repo/design-system/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/design-system/components/ui/form'
import { Input } from '@repo/design-system/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/design-system/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@repo/design-system/components/ui/radio-group'
import { cn } from '@repo/design-system/lib/utils'
import { IconSettings } from '@tabler/icons-react'
import { Check, ChevronsUpDown, Loader2Icon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Appearance, appearanceSchema } from '../schemas/appearance'

const themeOptions = [
  {
    value: 'system',
    label: 'System',
    onClickValue: 'system',
    preview: (
      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-2 rounded-sm bg-muted-950 p-2">
          <div className="space-y-2 rounded-md bg-muted-800 p-2 shadow-sm">
            <div className="h-2 w-[80px] rounded-lg bg-slate-400/15" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400/15" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-muted-800 p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-slate-400/15" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400/15" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-muted-800 p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-slate-400/15" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400/15" />
          </div>
        </div>
      </div>
    )
  },
  {
    value: 'light',
    label: 'Light',
    onClickValue: 'light',
    preview: (
      <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
        </div>
      </div>
    )
  },
  {
    value: 'dark',
    label: 'Dark',
    onClickValue: 'dark',
    preview: (
      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
          </div>
        </div>
      </div>
    )
  }
]

export function AppearanceForm({ attributes }: { attributes: Appearance }) {
  const { setTheme } = useTheme()

  const [loading, setLoading] = useState(false)

  const handleThemeToggle = React.useCallback(
    (theme: 'system' | 'light' | 'dark', e?: React.MouseEvent) => {
      const root = document.documentElement

      if (!document.startViewTransition) {
        setTheme(theme)
        return
      }

      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`)
        root.style.setProperty('--y', `${e.clientY}px`)
      }

      document.startViewTransition(() => {
        setTheme(theme)
      })
    },
    [setTheme]
  )

  const form = useForm<Appearance>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      locale: attributes.locale || 'en',
      zoneinfo: attributes.zoneinfo || 'America/Sao_Paulo',
      theme: JSON.parse(attributes.profile || '[]')[0]?.theme || 'system',
      profile: attributes.profile || ''
    }
  })

  const onSubmit = async (values: Appearance) => {
    setLoading(true)

    let parsedValues = OmitParser(values, ['theme'])

    parsedValues = {
      ...parsedValues,

      profile: `[${JSON.stringify({
        theme: values.theme,
        test: 'testing'
      })}]`
    }

    const data = await updateUser({ attributes: parsedValues })

    showSubmittedData(data)
    setLoading(false)
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="flex-1">
        <Form {...form}>
          <form className="space-y-6" id="appearance-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="locale"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                          variant="outline"
                        >
                          {field.value
                            ? languages.find((language) => language.value === field.value)?.label
                            : 'Select language'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                key={language.value}
                                onSelect={() => {
                                  form.setValue('locale', language.value)
                                }}
                                value={language.label}
                              >
                                <Check
                                  className={cn('mr-2', language.value === field.value ? 'opacity-100' : 'opacity-0')}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={loading}
              name="zoneinfo"
              render={({ field }) => (
                <FormItem className="gap-2">
                  <FormLabel>Zoneinfo</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your zoneinfo" type="text" {...field} disabled readOnly />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile and in emails.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Theme</FormLabel>
                  <FormDescription>Select the theme for the dashboard.</FormDescription>
                  <FormMessage />
                  <RadioGroup
                    className="flex max-w-md gap-8 pt-2"
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleThemeToggle(value as 'system' | 'light' | 'dark')
                    }}
                    value={field.value}
                  >
                    {themeOptions.map((option) => (
                      <FormItem key={option.value}>
                        <FormLabel className="flex-col [&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem className="sr-only" value={option.value} />
                          </FormControl>
                          {option.preview}
                          <span className="block w-full p-2 text-center font-normal">{option.label}</span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
            <Button className="w-[180px]" disabled={loading} form="appearance-form" type="submit">
              {loading && <Loader2Icon className="animate-spin" />}
              Update preferences
            </Button>
          </form>
        </Form>
      </div>

      <div className="ml-16">
        <Avatar className="h-52 w-52 rounded-lg">
          <AvatarFallback className="rounded-lg">
            <IconSettings className="h-26 w-26" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
