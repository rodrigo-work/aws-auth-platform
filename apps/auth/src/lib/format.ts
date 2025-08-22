export function normalizeDateLocal(input: string | number | Date | undefined | null): Date | null {
  if (!input) return null

  if (input instanceof Date) return isNaN(input.getTime()) ? null : input

  if (typeof input === 'string') {
    const matchDateOnly = input.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (matchDateOnly) {
      const [_, year, month, day] = matchDateOnly
      return new Date(Number(year), Number(month) - 1, Number(day))
    }
    const parsed = new Date(input)
    return isNaN(parsed.getTime()) ? null : parsed
  }

  if (typeof input === 'number') {
    const parsed = new Date(input)
    return isNaN(parsed.getTime()) ? null : parsed
  }

  return null
}

export function formatDate(date: Date | string | number | undefined): string {
  const parsed = normalizeDateLocal(date)
  if (!parsed) return ''

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(parsed)
}

export function formatISODate(date: Date | string | number | undefined): string {
  const parsed = normalizeDateLocal(date)
  if (!parsed) return ''

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
