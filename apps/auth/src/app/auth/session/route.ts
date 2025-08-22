'use server'

import { COOKIES_NAME } from '@/constants/data'
import { verifyToken } from '@/lib/verifyToken'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIES_NAME.idToken)?.value

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      ...payload,
      sub: payload.sub,
      name: payload.name,
      email: payload.email
    }
  })
}
