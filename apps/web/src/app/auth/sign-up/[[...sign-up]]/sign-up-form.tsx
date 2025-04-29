'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@repo/ui/components/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { Icons } from '@repo/ui/external/icons'
import { cn } from '@repo/ui/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { handleSignUp } from './api'

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(12, { message: 'Password must not exceed 12 characters' }),
  first_name: z.string().optional(),
  last_name: z.string().optional()
})

type UserFormValue = z.infer<typeof formSchema>

export const SignUpComponent = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const defaultValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  }

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (data: UserFormValue) => {
    try {
      setIsLoading(true)
      const success = await handleSignUp(data)

      if (success.UserSub) {
        router.push('/auth/confirm')
      } else {
        // } else if (success.type !== 'UserAlreadyExistsException') {
        toast(
          <div>
            <strong>You submitted the following values:</strong>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(success, null, 2)}
              </code>
            </pre>
          </div>
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/* <HeaderComponent /> */}
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              // placeholder="mail@example.com"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign up
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/auth/sign-in"
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
