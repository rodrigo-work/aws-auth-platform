'use client'

import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'

export default function LogoutPage() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await fetch('/auth/logout/api', {
          method: 'GET'
        })

        if (!res.ok) {
          throw new Error('Sessão não encontrada')
        }

        const data = await res.json()
        window.location.href = data.redirect_url
      } catch (_error) {
        // console.error('Erro na autenticação:', err)
      }
    }

    handleLogout()
  }, [])

  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <Loader2Icon className="animate-spin" />
    </div>
  )
}
