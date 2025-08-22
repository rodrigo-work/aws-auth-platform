export function strToHash(str: string): string {
  return Buffer.from(str).toString('base64url')
}

export function hashToStr(hash: string): string {
  return Buffer.from(hash, 'base64url').toString()
}
