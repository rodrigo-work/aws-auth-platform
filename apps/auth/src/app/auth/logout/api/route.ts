'use server'

import { env } from '@/env'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()

  const LOGOUT_URL = `${env.COGNITO_DOMAIN}/logout?client_id=${env.COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(
    env.COGNITO_REDIRECT_LOGOUT_URI
  )}`

  try {
    for (const cookie of cookieStore.getAll()) {
      cookieStore.delete(cookie.name)
    }

    return NextResponse.json({ redirect_url: LOGOUT_URL })
  } catch (error) {
    // console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
