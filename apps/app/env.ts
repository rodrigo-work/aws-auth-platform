// import { keys as email } from '@repo/email/keys'
// import { keys as ratelimit } from '@repo/rate-limit/keys'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  // extends: [email(), ratelimit()],
  client: {
    NEXT_PUBLIC_WEB_URL: z.url().optional(),

    NEXT_PUBLIC_API_URL: z.url().optional(),

    NEXT_PUBLIC_COGNITO_DOMAIN: z.url().optional(),
    NEXT_PUBLIC_COGNITO_REDIRECT_IN_URI: z.url().optional(),
    NEXT_PUBLIC_COGNITO_REDIRECT_OUT_URI: z.url().optional(),
    NEXT_PUBLIC_COGNITO_CLIENT_ID: z.string().optional(),
    NEXT_PUBLIC_COGNITO_ISSUER: z.url().optional()
  },
  server: {
    // COGNITO_CLIENT_ID: z.string()
    // RESEND_TOKEN: z.string().startsWith('re_')
  },
  runtimeEnv: {
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    NEXT_PUBLIC_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    NEXT_PUBLIC_COGNITO_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    NEXT_PUBLIC_COGNITO_REDIRECT_IN_URI: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_IN_URI,
    NEXT_PUBLIC_COGNITO_REDIRECT_OUT_URI: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_OUT_URI,
    NEXT_PUBLIC_COGNITO_ISSUER: process.env.NEXT_PUBLIC_COGNITO_ISSUER

    // RESEND_FROM: process.env.RESEND_FROM,
    // RESEND_TOKEN: process.env.RESEND_TOKEN
  }
})
