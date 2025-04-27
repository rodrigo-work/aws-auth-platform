// // app/api/callback/route.ts
// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(req: NextRequest) {
//   const code = req.nextUrl.searchParams.get('code')

//   if (!code) {
//     return NextResponse.json({ error: 'Code not found' }, { status: 400 })
//   }

//   const COGNITO_DOMAIN =
//     process.env.NEXT_PUBLIC_COGNITO_DOMAIN ||
//     'https://rodrigo-work.auth.us-east-1.amazoncognito.com/'
//   const CLIENT_ID =
//     process.env.NEXT_PUBLIC_CLIENT_ID || '4vd5651ldt63jloj9eiumsk9ld'
//   const REDIRECT_URI =
//     process.env.NEXT_PUBLIC_REDIRECT_UR || 'http://localhost:3000/api/callback'
//   const CLIENT_SECRET =
//     process.env.NEXT_PUBLIC_CLIENT_SECRET ||
//     '7vjmvsvp2i7klt94qsq4l60qt6fuvbei68s1ok7i2qsr1n3ql8r'

//   const tokenUrl = `${COGNITO_DOMAIN}/oauth2/token`

//   const body = new URLSearchParams({
//     grant_type: 'authorization_code',
//     client_id: CLIENT_ID!,
//     redirect_uri: REDIRECT_URI!,
//     code
//   })

//   const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
//     'base64'
//   )

//   try {
//     const tokenRes = await fetch(tokenUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${basicAuth}`
//       },
//       body
//     })

//     const tokenData = await tokenRes.json()

//     if (!tokenRes.ok) {
//       console.error('Token fetch failed:', tokenData)
//       return NextResponse.json({ error: 'Token fetch failed' }, { status: 500 })
//     }

//     // Armazenar token em cookie HTTP-only
//     console.log('Token data:', tokenData)
//     const response = NextResponse.redirect(new URL('/dashboard', req.url))
//     response.cookies.set('access_token', tokenData.access_token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'lax',
//       path: '/',
//       maxAge: 3600 // 1h
//     })

//     return response
//   } catch (err) {
//     console.error('Error in token exchange:', err)
//     return NextResponse.json(
//       { error: 'Failed to exchange token' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 })
  }

  const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!
  const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
  const REDIRECT_URI = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!

  const tokenUrl = `${COGNITO_DOMAIN}/oauth2/token`
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code
  })

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  )

  try {
    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`
      },
      body
    })

    const tokenData = await tokenRes.json()

    if (!tokenRes.ok) {
      console.error('Failed to get token:', tokenData)
      return NextResponse.json(
        { error: 'Failed to get token' },
        { status: 500 }
      )
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 3600
    })

    return response
  } catch (err) {
    console.error('Token exchange error:', err)
    return NextResponse.json(
      { error: 'Token exchange failed' },
      { status: 500 }
    )
  }
}
