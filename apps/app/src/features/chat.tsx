/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/design-system/components/ui/dialog'
import { Check, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from './actions'
import { type Users, usersSchema, usersSchema2 } from './users/data/schema'

const data = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png'
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png'
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png'
  }
] as const

// type User = (typeof users2)[number]

// type User = {
//   id: string
//   email: string
// }

// interface CardsChatProps {
//   users: User[]
// }

export function CardsChat() {
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([])

  const [users, setUsers] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      try {
        // const res = await fetch('http://localhost:3000/api/fake/users')

        // if (!res.ok) {
        //   throw new Error('Erro ao buscar usuários')
        // }

        // const data = await res.json()
        const data = await getAllUsers({})
        // const total = data.total
        //    const users: Users = data.data
        const users: Users = usersSchema.parse(data.data)
        const usergroup: any = usersSchema2.parse(data.data)

        setUsers(usergroup)
      } catch (err) {
        setError((err as Error).message)
      }
    }

    fetchUsers()
  }, [])

  if (error) {
    return <div className="flex gap-2">123123</div>
  }

  const datass = users
  // const usersssss: UserGroup = userGroupsSchema.parse({ data: data2 })

  return (
    <>
      <Button className="ml-auto" onClick={() => setOpen(true)} variant="outline">
        <Plus /> Guests
        <span className="sr-only">New guest</span>
      </Button>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pt-5 pb-4">
            <DialogTitle>Guests</DialogTitle>
            <DialogDescription>
              Invite a guest to this thread. This will create a new group message .
              {/* {JSON.stringify(datass)} */}
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="Search guest..." />
            <CommandList>
              <CommandEmpty>No guest found.</CommandEmpty>
              <CommandGroup className="p-2">
                {datass.map((user: any) => {
                  return (
                    <CommandItem
                      className="flex items-center px-2"
                      key={user.email}
                      onSelect={() => {
                        if (selectedUsers.includes(user)) {
                          return setSelectedUsers(
                            selectedUsers.filter((selectedUser) => selectedUser !== user)
                          )
                        }

                        return setSelectedUsers(
                          [...data].filter((u) => [...selectedUsers, user].includes(u))
                        )
                      }}
                    >
                      <Avatar>
                        {/* <AvatarImage src={user.avatar} alt="Image" /> */}
                        <AvatarFallback>
                          {user.email[0].toUpperCase()}
                          {user.email[1].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <p className="font-medium text-sm leading-none">{user.name}</p>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                      </div>
                      {selectedUsers.includes(user) ? (
                        <Check className="ml-auto flex h-5 w-5 text-primary" />
                      ) : null}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            <p className="text-muted-foreground text-sm">Select guests to add to this thread.</p>
            {selectedUsers.length > 0 ? (
              <div className="-space-x-2 flex overflow-hidden">
                {/* {selectedUsers.map((user: any) => (
                  <Avatar className="inline-block border-2 border-background" key={user.email}>
                    <AvatarImage src={user.email} />
                    <AvatarFallback>
                      {user.name[0].toUpperCase()}
                      {user.name[1].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))} */}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Select guests to add to this thread.</p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                alert(JSON.stringify(selectedUsers))
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
