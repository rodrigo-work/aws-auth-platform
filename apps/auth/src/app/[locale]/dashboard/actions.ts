'use server'

import {
  AssociateSoftwareTokenCommand,
  type AttributeType,
  CognitoIdentityProviderClient,
  GetUserAttributeVerificationCodeCommand,
  GetUserCommand,
  type GetUserCommandOutput,
  SetUserMFAPreferenceCommand,
  UpdateUserAttributesCommand,
  VerifySoftwareTokenCommand,
  VerifyUserAttributeCommand
} from '@aws-sdk/client-cognito-identity-provider'
import lodash from 'lodash'
import { cookies } from 'next/headers'
import { env } from '@/env'

type PaginatorProps = {
  limit?: number
  page?: number
  search?: string
  name?: string
}

export const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' })

export async function getUser2(): Promise<any> {
  await delay(2000)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    const updateCommand = new GetUserCommand({
      AccessToken: accessToken
    })
    const result: GetUserCommandOutput = await client.send(updateCommand)

    const attributes = lodash.fromPairs(
      (result.UserAttributes ?? [])
        .filter(
          (attr): attr is Required<Pick<AttributeType, 'Name' | 'Value'>> =>
            typeof attr.Name === 'string' && typeof attr.Value === 'string'
        )
        .map((attr) => [attr.Name, attr.Value])
    )

    const parsedValues = {
      username: result.Username,
      auth2fa: result.UserMFASettingList?.includes('SOFTWARE_TOKEN_MFA') ?? false,
      ...attributes
    }

    return parsedValues
  } catch (error) {
    // console.error('Erro:', error)
    return error
  }

  // return accessToken
}
export async function getUser(): Promise<any> {
  await delay(2000)

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Sessão não encontrada')
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.error('Erro na autenticação:', err)
  } finally {
    // console.info('ok')
  }
}
export async function updateUser({ attributes }: any) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const selectedAttributes = lodash.pick(attributes, [
    'name',
    'given_name',
    'family_name',
    'phone_number',
    'phone_number_verified',
    'zoneinfo',
    'locale',
    'profile',
    'birthdate'
  ])

  // Mapeia para o formato desejado
  const flattened = lodash.map(selectedAttributes, (value, key) => ({
    // Name: key === 'username' ? 'email' : key,
    Name: key,
    Value: value
  }))

  console.log(flattened)

  try {
    const updateCommand = new UpdateUserAttributesCommand({
      AccessToken: accessToken,
      UserAttributes: flattened
    })
    const result = await client.send(updateCommand)

    return result
  } catch (error) {
    // console.error('Erro:', error)
    return error
  }

  // return accessToken
}

type verifyEmailProps = {
  code?: string
}

export async function verifyEmail({ code }: verifyEmailProps) {
  await delay(1000)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    if (code?.length === 6) {
      const verifyCommand = new VerifyUserAttributeCommand({
        AccessToken: accessToken,
        AttributeName: 'email',
        Code: code
      })
      return await client.send(verifyCommand)
    }

    const sendCommand = new GetUserAttributeVerificationCodeCommand({
      AccessToken: accessToken,
      AttributeName: 'email'
    })
    return await client.send(sendCommand)
  } catch (error) {
    // console.error('Erro:', error)
    return error
  }
}

export async function associateSoftwareToken() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    const associateCommand = new AssociateSoftwareTokenCommand({
      AccessToken: accessToken
    })

    const { SecretCode } = await client.send(associateCommand)
    return SecretCode
  } catch (err) {
    console.error('Erro ao ativar MFA:', err)
    return err
  }
}

export async function verifySoftwareToken(code: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const setCommand = new SetUserMFAPreferenceCommand({
    AccessToken: accessToken,
    SoftwareTokenMfaSettings: {
      Enabled: false,
      PreferredMfa: false
    }
  })

  return await client.send(setCommand)

  console.log('accessToken', code)

  try {
    const verifyCommand = new VerifySoftwareTokenCommand({
      AccessToken: accessToken,
      UserCode: code, // ex: "123456"
      FriendlyDeviceName: 'My Device' // opcional
    })

    const verifyResponse = await client.send(verifyCommand)
    console.log('verifyResponse', verifyResponse)

    const setCommand = new SetUserMFAPreferenceCommand({
      AccessToken: accessToken,
      SoftwareTokenMfaSettings: {
        Enabled: true,
        PreferredMfa: true
      }
    })

    return await client.send(setCommand)
  } catch (err) {
    console.error('Erro ao ativar MFA:', err)
    return err
  }
}
