'use client'

import { log } from '@repo/logger'
import { Button } from '@repo/ui/components/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const code = searchParams.get('code')
  const redirect = searchParams.get('state') || '/dashboard'

  useEffect(() => {
    if (!code) return

    const exchangeToken = async () => {
      try {
        const res = await fetch('/api/exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        })

        if (!res.ok) {
          console.error('Token exchange failed')
          return
        }

        // Redireciona para dashboard após autenticação
        router.push(redirect)
      } catch (err) {
        console.error('Error exchanging token:', err)
      }
    }

    exchangeToken()
  }, [code, router, redirect])

  log('Hey! This is the Web page.')

  const handleLogin = () => {
    const authorizeUrl =
      `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN!}/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!}&` +
      `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!)}&` +
      `scope=openid&` +
      `state=${encodeURIComponent(redirect)}`

    router.push(authorizeUrl)
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <code>redirect = {redirect}</code>
        <code>code = {code}</code>
        <Button size="sm" onClick={handleLogin}>
          Login com Cognito
        </Button>
      </div>
    </div>
  )
}
