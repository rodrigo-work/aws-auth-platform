'use client'

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageContent({ children, title, description }: PageHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-8 sm:grid-cols-8">
      <div className="col-span-1 flex flex-col gap-1 sm:col-span-3">
        <div className="flex flex-wrap gap-2">
          <h1 className="text-zinc-950/90 dark:text-white/90">{title}</h1>
        </div>
        <h2 className="text-zinc-950/50 dark:text-white/50">{description}</h2>
      </div>

      <div className="col-span-1 mt-1.5 flex flex-col gap-8 font-normal sm:col-span-5">
        {children}
      </div>
    </div>
  )
}
