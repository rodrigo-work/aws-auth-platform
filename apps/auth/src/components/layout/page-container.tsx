import { ScrollArea } from '@repo/design-system/components/ui/scroll-area'
import type React from 'react'

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: React.ReactNode
  scrollable?: boolean
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-140px)]">
          <div className="mx-auto flex max-w-6xl flex-1 p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="mx-auto flex max-w-6xl flex-1 p-4 md:px-6">{children}</div>
      )}
    </>
  )
}
