import { internationalizationMiddleware } from '@repo/internationalization/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { cookiesName } from './constants/data'
import { strToHash } from './lib/utils'

const AUTH_BASE_URL = 'https://auth.rodrigo.work'
const REDIRECT_URI = `${AUTH_BASE_URL}/api/auth/callback`

export default function middleware(req: NextRequest) {
  const i18nResponse = internationalizationMiddleware(req)

  const { pathname, search } = req.nextUrl

  const locale = pathname.split('/')[1]

  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  }

  if (i18nResponse) {
    const cookieToken = req.cookies.get(cookiesName.idToken)?.value
    const authHeader = req.headers.get('authorization')
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    const urlToken = req.nextUrl.searchParams.get('token') // fallback opcional

    const token = headerToken || cookieToken || urlToken
    if (!token) {
      return NextResponse.redirect(
        new URL(
          `${AUTH_BASE_URL}/login?redirect=${encodeURIComponent(strToHash(pathname + search))}`,
          req.url
        )
      )
    }

    // const payload = await verifyToken(token)
    // if (!payload) {
    //   new URL(`/auth/login?redirect=${encodeURIComponent(strToHash(pathname + search))}`, req.url)
    // }

    return i18nResponse
  }

  // if (req.cookies.has(cookiesName.idToken) && pathname.startsWith('/auth')) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url))
  // }

  if (req.cookies.has(cookiesName.idToken) && !pathname.includes(`/${locale}/dashboard`)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher:
    '/((?!api|auth|legal|_next/static|_next/image|favicon.ico|manifest|icon.svg|apple-icon.png).*)'
}
