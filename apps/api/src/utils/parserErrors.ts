import type { ZodError } from 'zod'

export function formatZodError(error: ZodError): string {
  const items = error._zod.def
  return items
    .map((e) => {
      // const path = e.path.join('.')
      return e.message
      // return path ? `${path}: ${e.message}` : e.message
    })
    .join('; ')
}
