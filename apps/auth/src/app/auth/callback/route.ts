'use server'

import { COOKIES_NAME } from '@/constants/data'
import { env } from '@/env'
import { hashToStr } from '@/lib/utils'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let returnUrl: string
  const cookieStore = await cookies()
  const code = req.nextUrl.searchParams.get('code')
  const redirectUrl = req.nextUrl.searchParams.get('state')

  if (!code) {
    return NextResponse.redirect('/?error=token')
  }

  if (redirectUrl) {
    returnUrl = `${env.NEXT_PUBLIC_WEB_URL}/${hashToStr(redirectUrl)}`
  } else {
    returnUrl = `${env.NEXT_PUBLIC_WEB_URL}/dashboard`
  }

  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('client_id', env.COGNITO_CLIENT_ID)
    params.append('redirect_uri', env.COGNITO_REDIRECT_LOGIN_URI)

    const basicAuth = Buffer.from(`${env.COGNITO_CLIENT_ID}:${env.COGNITO_CLIENT_SECRET}`).toString(
      'base64'
    )

    const tokenRes = await fetch(`${env.COGNITO_DOMAIN}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`
      },
      body: params.toString()
    })

    if (!tokenRes.ok) {
      // const errorBody = await tokenRes.text()
      // console.error('Erro ao buscar token:', errorBody)
      return NextResponse.redirect(new URL('/?error=token', req.url))
    }

    const { id_token, access_token, refresh_token, expires_in } = await tokenRes.json()

    cookieStore.set(COOKIES_NAME.accessToken, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // domain: process.env.NODE_ENV === 'production' ? '.rodrigo.work' : 'localhost',
      maxAge: expires_in
    })

    cookieStore.set(COOKIES_NAME.idToken, id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // domain: process.env.NODE_ENV === 'production' ? '.rodrigo.work' : 'localhost',
      maxAge: expires_in
    })

    cookieStore.set(COOKIES_NAME.refreshToken, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // domain: process.env.NODE_ENV === 'production' ? '.rodrigo.work' : 'localhost',
      maxAge: 60 * 60 * 24 * 30
    })

    return NextResponse.redirect(new URL(returnUrl, req.url))
  } catch (_error) {
    //  console.error('Erro inesperado:', error.message || error)
    return NextResponse.redirect(new URL('/?error=exception', req.url))
  }
}
