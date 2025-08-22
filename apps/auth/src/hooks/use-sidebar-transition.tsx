'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'

interface SwapContextType {
  showSecond: boolean
  toggle: () => void
}

const SwapContext = createContext<SwapContextType | undefined>(undefined)

export const SidebarTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [showSecond, setShowSecond] = useState(false)

  const toggle = () => setShowSecond((prev) => !prev)

  return <SwapContext.Provider value={{ showSecond, toggle }}>{children}</SwapContext.Provider>
}

export const useSidebarTransition = () => {
  const context = useContext(SwapContext)
  if (!context) {
    throw new Error('useSwap must be used within a SwapProvider')
  }
  return context
}
