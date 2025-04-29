import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  // Protege todas as rotas da API (exceto /api/login)
  if (pathname.startsWith('/api') && !token) {
    return new NextResponse(
      JSON.stringify({ status: 401, message: 'Unauthorized' })
    )
  }

  // Protege todas as rotas do dashboard (exceto /dashboard/home e /dashboard/tasks)
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/auth/sign-in', request.url)
    loginUrl.searchParams.set('state', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: ['/api/(?!login).*', '/dashboard/(?!home|tasks).*']
// }

// Aplica o middleware a todas as rotas, exceto estáticos e API
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/exchange|dashboard/home).*)'
  ]
}
