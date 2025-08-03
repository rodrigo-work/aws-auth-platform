import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/design-system/components/ui/tooltip'
import type React from 'react'

interface TooltipCustomProps {
  tooltipContent: string
  children: React.ReactNode
}

export function TooltipCustom({ tooltipContent, children }: TooltipCustomProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}
