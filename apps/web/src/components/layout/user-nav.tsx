'use client'

import { useUser } from '@/hooks/use-user'
import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu'
// import { SignOutButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
export function UserNav() {
  // const { user } = useUser()
  const user = useUser()
  const router = useRouter()

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            {/* <UserAvatarProfile user={user} /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          sideOffset={10}
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">
                {user.given_name} {user.family_name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {/* <SignOutButton redirectUrl="/auth/sign-in" /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
