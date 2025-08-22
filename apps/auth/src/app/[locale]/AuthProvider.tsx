'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface User {
  picture: string
  email: string
  name: string
  sub: string
  role: string
  phone_number: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuth = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/auth/session', {
          method: 'GET',
          credentials: 'include'
        })

        // if (!res.ok) {
        //   throw new Error('Sessão não encontrada')
        // }

        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.error('Erro na autenticação:', err)
        setUser(null)
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    handleAuth()
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user
    }),
    [user, isLoading]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth precisa ser usado dentro de <AuthProvider>')
  }

  return authContext
}
