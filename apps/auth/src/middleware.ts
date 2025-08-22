import { internationalizationMiddleware } from '@repo/internationalization/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAME } from './constants/data'
import { strToHash } from './lib/utils'
import { verifyToken } from './lib/verifyToken'

export default async function middleware(req: NextRequest) {
  const i18nResponse = internationalizationMiddleware(req)

  const { pathname, search } = req.nextUrl

  const locale = pathname.split('/')[1]

  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  }

  if (i18nResponse) {
    const token = req.cookies.get(COOKIES_NAME.idToken)?.value
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?redirect=${encodeURIComponent(strToHash(pathname + search))}`, req.url)
      )
    }

    const payload = await verifyToken(token)
    if (!payload) {
      new URL(`/auth/login?redirect=${encodeURIComponent(strToHash(pathname + search))}`, req.url)
    }

    return i18nResponse
  }

  if (req.cookies.has(COOKIES_NAME.idToken) && !pathname.includes(`/${locale}/dashboard`)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|auth|_next/static|_next/image|favicon.ico|manifest|icon.svg|apple-icon.png).*)'
}
