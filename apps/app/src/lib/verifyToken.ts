import { env } from '@/env'
import { createRemoteJWKSet, jwtVerify, type JWTVerifyResult } from 'jose'

const JWKS = createRemoteJWKSet(new URL(`${env.COGNITO_ISSUER}/.well-known/jwks.json`))

export async function verifyToken(token: string) {
  try {
    const { payload }: JWTVerifyResult = await jwtVerify(token, JWKS, {
      issuer: env.COGNITO_ISSUER,
      audience: env.COGNITO_CLIENT_ID // ✅ RECOMENDADO ATIVAR
    })

    if (!payload.sub) {
      throw new Error('Usuário sem sub (ID)')
    }
    if (!payload.email) {
      throw new Error('Token sem e-mail')
    }
    if (!payload.email_verified) {
      throw new Error('Email não verificado')
    }

    const groups = payload['cognito:groups'] as string[] | undefined

    return {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      groups: groups || [],
      ...payload
    }
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return null
  }
}
