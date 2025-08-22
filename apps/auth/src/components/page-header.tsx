'use client'

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ children, title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center">
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="mr-2 inline-block font-medium text-lg text-zinc-800 leading-7 dark:text-white">
          {title}
        </h2>
        <span className="text-sm text-zinc-950/50 dark:text-white/50">{description}</span>
        {children}
      </div>
    </div>
  )
}
