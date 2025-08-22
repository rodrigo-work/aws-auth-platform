'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
import { Badge } from '@repo/design-system/components/ui/badge'
import { Button } from '@repo/design-system/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/design-system/components/ui/form'
import { Input } from '@repo/design-system/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/design-system/components/ui/input-otp'
import { Loader2Icon, MoveRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { verifyEmail } from '../../actions'

const formSchema = z.object({
  email: z.string().optional(),
  email_verified: z.string().optional(),
  code: z.string().min(6).max(6).optional()
})
type UserInviteForm = z.infer<typeof formSchema>

export function ContactEmailForm({ attributes }: { attributes: any }) {
  const [loading, setLoading] = useState(false)

  const [showTimer, setShowTimer] = useState(false)
  const [codeExpired, setCodeExpired] = useState(false)

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: attributes?.email || '',
      email_verified: attributes?.email_verified || '',
      code: ''
    }
  })

  const onSubmit = async (values: UserInviteForm) => {
    setLoading(true)
    const data = await verifyEmail({ code: values.code })
    showSubmittedData(data)
    setLoading(false)
  }

  const onSendCode = async () => {
    setLoading(true)

    const data = await verifyEmail({})

    showSubmittedData(data)

    setShowTimer(true)
    setCodeExpired(false)

    setLoading(false)
  }

  const handleCodeExpired = () => {
    setShowTimer(false)
    setCodeExpired(true)
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="flex-1">
        <Form {...form}>
          <form
            className="space-y-6"
            id="contact-email-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="text"
                      {...field}
                      disabled
                      readOnly
                    />
                  </FormControl>
                  <FormDescription className="flex flex-row justify-between">
                    <span className="flex-1">
                      This is the email that will be displayed on your profile and in emails.
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Verification code Email verified{' '}
                      <Badge className="bg-green-500">{attributes.email_verified}</Badge>
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className={`gap-2 ${showTimer ? '' : 'hidden'}`}>
                  <FormLabel>Email verification code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} disabled={!showTimer}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>Please enter the code sent to your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center gap-2">
              <Button
                className={`${showTimer ? 'hidden' : ''}`}
                disabled={showTimer}
                onClick={() => onSendCode()}
                type="button"
                variant={attributes.email_verified === 'true' ? 'destructive' : 'outline'}
              >
                {codeExpired ? 'Resend verification code' : 'Send verification code'}
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <MoveRight className="h-4 w-4" />
                )}
              </Button>

              <Button
                className={`${showTimer ? '' : 'hidden'}`}
                disabled={!showTimer}
                form="contact-email-form"
                type="submit"
              >
                Verify code{' '}
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <MoveRight className="h-4 w-4" />
                )}
              </Button>

              <span className="flex-1">
                {showTimer && <VerificationCodeTimer duration={20} onExpire={handleCodeExpired} />}
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

const VALIDITY_DURATION = 300 // 300 segundos (5 minutos)

type VerificationCodeTimerProps = {
  duration?: number // em segundos, padrão 300
  onExpire?: () => void
}

const VerificationCodeTimer: React.FC<VerificationCodeTimerProps> = ({
  duration = 300,
  onExpire
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(duration)
  const [expired, setExpired] = useState<boolean>(false)

  useEffect(() => {
    if (remainingTime <= 0) {
      setExpired(true)
      if (onExpire) onExpire()
      return
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [remainingTime, onExpire])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div>
      {!expired && (
        <p>
          The code expires in: <span className="font-bold">{formatTime(remainingTime)}</span>
        </p>
      )}
    </div>
  )
}
