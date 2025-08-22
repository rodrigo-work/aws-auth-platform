'use client'

import { SETTINGS } from '@/constants/data'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar'
import { IconAuth2fa } from '@tabler/icons-react'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  email: string
  secret: string
  showQr: boolean
}

export const ImageDemo = ({ email, secret, showQr }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imgDataURL, setImgDataURL] = useState<string>()

  const issuer = SETTINGS.NAME
  const label = `${issuer}:${email}`
  const otpUrl = `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${issuer}`

  useEffect(() => {
    if (!showQr) {
      return
    }

    const node = canvasRef.current
    if (!node) {
      return
    }

    const timeout = setTimeout(() => {
      try {
        const dataURI = node.toDataURL('image/png')
        setImgDataURL(dataURI)
      } catch (_error) {
        // console.error('Failed to convert canvas to image', error)
        throw new Error('Failed to convert canvas to image')
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [showQr])

  return (
    <>
      {showQr && (
        <div style={{ display: 'none' }}>
          <QRCodeCanvas ref={canvasRef} size={256} value={otpUrl} />
        </div>
      )}

      {imgDataURL && showQr && (
        <Avatar className="h-52 w-52 rounded-lg">
          <AvatarImage className="h-52 w-52" src={imgDataURL} />
        </Avatar>
      )}

      {!(imgDataURL && showQr) && (
        <Avatar className="h-52 w-52 rounded-lg">
          <AvatarFallback className="flex h-52 w-52 items-center justify-center rounded-lg">
            <IconAuth2fa className="h-26 w-26" />
          </AvatarFallback>
        </Avatar>
      )}
    </>
  )
}
