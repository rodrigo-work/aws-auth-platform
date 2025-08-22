'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'verification_code_expiry'

export function useVerificationTimerStatus(onExpire?: () => void, forceRestartKey?: number) {
  const [isActive, setIsActive] = useState<boolean | null>(null)
  const [remainingTime, setRemainingTime] = useState<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkStatus = () => {
      const expiry = localStorage.getItem(STORAGE_KEY)
      if (!expiry) {
        setIsActive(false)
        setRemainingTime(0)
        return
      }

      const expiryTime = Number.parseInt(expiry, 10)
      const now = Date.now()
      const timeLeft = Math.floor((expiryTime - now) / 1000)

      if (timeLeft <= 0) {
        localStorage.removeItem(STORAGE_KEY)
        setIsActive(false)
        setRemainingTime(0)
        if (onExpire) onExpire()
        clearInterval(interval)
      } else {
        setIsActive(true)
        setRemainingTime(timeLeft)
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 1000)

    return () => clearInterval(interval)
  }, [onExpire, forceRestartKey]) // agora depende também de `forceRestartKey`

  return { isActive, remainingTime }
}
