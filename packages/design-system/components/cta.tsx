import { Button } from '@repo/design-system/components/ui/button'
import { IconBrandGithub } from '@tabler/icons-react'

export  function Cta() {
  return (
    <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
      <a
        href="https://github.com/rodrigo-work/aws-auth-platform"
        rel="noopener noreferrer"
        target="_blank"
        className="dark:text-foreground"
      >
        <IconBrandGithub />
      </a>
    </Button>
  )
}
