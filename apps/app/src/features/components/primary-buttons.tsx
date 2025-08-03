'use client'

import { Button, buttonVariants } from '@repo/design-system/components/ui/button'
import { cn } from '@repo/design-system/lib/utils'
import { IconMailPlus, IconPlus } from '@tabler/icons-react'
import { CardsChat } from '../chat'
import { useGroups } from '../context/groups-context'

export function PrimaryButtons() {
  const { setOpen } = useGroups()

  return (
    <div className="flex gap-2">
      <CardsChat />
      <Button
        className={'space-x-1 text-xs md:text-sm'}
        onClick={() => setOpen('add')}
        variant="outline"
      >
        <IconPlus size={18} /> <span>Add user</span>
      </Button>
      <Button
        className={cn(buttonVariants(), 'space-x-1 text-xs md:text-sm')}
        onClick={() => setOpen('add')}
        variant="outline"
      >
        <span>Add group</span> <IconMailPlus size={18} />
      </Button>
    </div>
  )
}
