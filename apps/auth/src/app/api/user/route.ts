import {
  type AttributeType,
  CognitoIdentityProviderClient,
  GetUserCommand,
  type GetUserCommandOutput
} from '@aws-sdk/client-cognito-identity-provider'
import lodash from 'lodash'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' })
export async function GET() {
  // const data = {
  //   email: 'me@rodrigo.work',
  //   email_verified: 'true',
  //   name: 'Rodrigo Ribeiro',
  //   family_name: 'Ribeiro',
  //   given_name: 'Rodrigo',
  //   zoneinfo: 'America/Sao_Paulo',
  //   locale: 'en',
  //   profile: '[{"theme":"system","test":"testing"}]',
  //   birthdate: '1984-02-22',
  //   sub: '9428d408-b0f1-70d7-ed2b-c649d6bc5a3f',
  //   username: '9428d408-b0f1-70d7-ed2b-c649d6bc5a3f',
  //   auth2fa: false
  // }

  // return NextResponse.json(data)

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

    return NextResponse.json({
      ...attributes,
      username: result.Username,
      auth2fa: result.UserMFASettingList?.includes('SOFTWARE_TOKEN_MFA') ?? false
    })
  } catch (error) {
    return NextResponse.json(error)
  }
}
