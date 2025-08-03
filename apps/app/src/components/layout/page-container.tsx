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
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="flex flex-1 p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="flex flex-1 p-4 md:px-6">{children}</div>
        // <main className="mx-auto flex w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
      )}
    </>
  )
}
