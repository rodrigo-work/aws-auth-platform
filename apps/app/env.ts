// import { keys as email } from '@repo/email/keys'
// import { keys as ratelimit } from '@repo/rate-limit/keys'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  // extends: [email(), ratelimit()],
  server: {},
  client: {},
  runtimeEnv: {}
})
