import { keys as ratelimit } from '@repo/rate-limit/keys'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  extends: [ratelimit()],
  client: {
    NEXT_PUBLIC_WEB_URL: z.url().optional(),
    NEXT_PUBLIC_API_URL: z.url().optional()
  },
  server: {
    COGNITO_DOMAIN: z.url(),
    COGNITO_ISSUER: z.url(),
    COGNITO_REDIRECT_LOGIN_URI: z.url(),
    COGNITO_REDIRECT_LOGOUT_URI: z.url(),

    COGNITO_REGION: z.string(),
    COGNITO_USER_POOL_ID: z.string(),

    COGNITO_CLIENT_ID: z.string(),
    COGNITO_CLIENT_SECRET: z.string()
    // RESEND_TOKEN: z.string().startsWith('re_')
  },
  runtimeEnv: {
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
    COGNITO_ISSUER: process.env.COGNITO_ISSUER,
    COGNITO_REDIRECT_LOGIN_URI: process.env.COGNITO_REDIRECT_LOGIN_URI,
    COGNITO_REDIRECT_LOGOUT_URI: process.env.COGNITO_REDIRECT_LOGOUT_URI,

    COGNITO_REGION: process.env.COGNITO_REGION,
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,

    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET

    // RESEND_FROM: process.env.RESEND_FROM,
    // RESEND_TOKEN: process.env.RESEND_TOKEN
  }
})
