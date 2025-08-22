'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@repo/design-system/components/show-submitted-data'
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/design-system/components/ui/input-otp'
import { Switch } from '@repo/design-system/components/ui/switch'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { associateSoftwareToken, setupSoftwareToken, verifySoftwareToken } from '../actions'
import { type Account, type FormSchema, formSchema } from '../schemas'
import { ImageDemo } from './genetare-qrcode'

export function MfaForm({ attributes }: { attributes: Account }) {
  const [loading, setLoading] = useState(false)

  const [showQr, setShowQr] = useState(false)
  const [showCodeField, setShowCodeField] = useState(false)
  const [secretCode, setSecretCode] = useState('')

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mfa: attributes.mfa || undefined,
      code: ''
    }
  })

  const onSubmit = async (values: FormSchema) => {
    let result: string | unknown
    setLoading(true)

    const parsedValues = {
      ...values
    }

    result = await verifySoftwareToken(parsedValues.code)
    if (result === 'SUCCESS') {
      result = await setupSoftwareToken(true)
    }

    showSubmittedData(result)
    setLoading(false)
  }

  const handleGenerateCode = async (value: boolean) => {
    if (value === true) {
      const data = await associateSoftwareToken()
      setSecretCode(`${data}`)

      setShowQr(true)
      setShowCodeField(true)

      showSubmittedData(data)
    } else {
      const data = await setupSoftwareToken(value)
      setSecretCode('')

      setShowQr(false)
      setShowCodeField(false)

      showSubmittedData(data)
    }

    // form.resetField('code')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-start justify-between">
        <div className="flex-1">
          <Form {...form}>
            <form className="space-y-6" id="account-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="mfa"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-4">
                    <div className="space-y-1">
                      <FormLabel>Communication emails</FormLabel>
                      <FormDescription>
                        Receive emails about your account activity.
                        {/* {secretCode && (
                          <span className="mt-2 block text-muted-foreground text-xs">
                            {secretCode}
                          </span>
                        )} */}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleGenerateCode(checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                // disabled={!showCodeField}
                name="code"
                render={({ field }) => (
                  <FormItem className={`gap-2 ${showCodeField ? '' : ''}`}>
                    <FormLabel>Email verification code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
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

              <Button
                className={`flex items-center gap-2 ${showCodeField ? '' : ''}`}
                // disabled={!showCodeField}
                form="account-form"
                type="submit"
              >
                {loading && <Loader2Icon className="animate-spin" />}
                Update account
              </Button>
            </form>
          </Form>
        </div>

        <div className="sm:ml-6 sm:block">
          {<ImageDemo email={attributes.email} secret={secretCode} showQr={showQr} />}
        </div>
      </div>

      {/* <div className="flex-1 gap-4">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm--">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div> */}
    </div>
  )
}
