'use server'

import { COOKIES_NAME } from '@/constants/data'
import { env } from '@/env'
import {
  ChangePasswordCommand,
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider'
import { cookies } from 'next/headers'
import type { FormSchema } from '../schemas'

const client = new CognitoIdentityProviderClient({ region: env.COGNITO_REGION })

export async function changeUserPassword({
  attributes
}: {
  attributes: Omit<FormSchema, 'confirmPassword'>
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIES_NAME.accessToken)?.value

  const command = new ChangePasswordCommand({
    AccessToken: accessToken,
    PreviousPassword: attributes.currentPassword,
    ProposedPassword: attributes.newPassword
  })

  try {
    await client.send(command)
    return { success: 'Password changed successfully.' }
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: Need console here
    console.error('Failed to change password:', error)
    return { title: 'Failed to change password:', error: `${(error as Error).message}` }
  }
}
