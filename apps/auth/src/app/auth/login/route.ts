import { env } from '@/env'
import { type NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  let STATE: string | unknown
  const LANG = 'pt-BR'
  const SCOPES = 'openid+email+profile+aws.cognito.signin.user.admin'

  const redirectUrl = req.nextUrl.searchParams.get('redirect')

  if (redirectUrl) {
    STATE = `&state=${redirectUrl}`
  } else {
    STATE = ''
  }

  const LOGIN_URL = `${env.COGNITO_DOMAIN}/oauth2/authorize?response_type=code&client_id=${env.COGNITO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    env.COGNITO_REDIRECT_LOGIN_URI
  )}&scope=${SCOPES}&lang=${LANG}${STATE}`

  return NextResponse.redirect(LOGIN_URL)
}
