'use server'

import { COOKIES_NAME } from '@/constants/data'
import { env } from '@/env'
import {
  AssociateSoftwareTokenCommand,
  CognitoIdentityProviderClient,
  SetUserMFAPreferenceCommand,
  VerifySoftwareTokenCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { cookies } from 'next/headers'

const client = new CognitoIdentityProviderClient({ region: env.COGNITO_REGION })

export async function associateSoftwareToken() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIES_NAME.accessToken)?.value

  const command = new AssociateSoftwareTokenCommand({
    AccessToken: accessToken
  })

  try {
    const response = await client.send(command)
    return response.SecretCode
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: Need console here
    console.error('Failed associate software token:', error)
    return { title: 'Failed associate software token:', error: `${(error as Error).message}` }
  }
}

export async function verifySoftwareToken(code: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIES_NAME.accessToken)?.value

  const command = new VerifySoftwareTokenCommand({
    AccessToken: accessToken,
    UserCode: code
    // FriendlyDeviceName: 'My Device'
  })

  try {
    const response = await client.send(command)
    return response.Status
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: Need console here
    console.error('Failed to verify software token:', error)
    return { title: 'Failed to verify software token:', error: `${(error as Error).message}` }
  }
}

export async function setupSoftwareToken(status: boolean) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIES_NAME.accessToken)?.value

  const command = new SetUserMFAPreferenceCommand({
    AccessToken: accessToken,
    SoftwareTokenMfaSettings: {
      Enabled: status,
      PreferredMfa: status
    }
  })

  try {
    await client.send(command)
    return { success: status ? 'MFA enabled successfully' : 'MFA disabled successfully' }
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: Need console here
    console.error('Failed to setup MFA:', error)
    return { title: 'Failed to setup MFA:', error: `${(error as Error).message}` }
  }
}
