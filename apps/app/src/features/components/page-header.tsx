'use client'

interface PageHeaderProps {
  title: string
  description: string
  children?: React.ReactNode
}

export function PageHeader({ children, title, description }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="font-bold text-2xl tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  )
}
