import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher:
    '/((?!api|api/(?!home|tasks)|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|_pagefind).*)'
}

export default function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}
