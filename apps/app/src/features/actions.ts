// 'use server'

import { env } from '@/env'
import { serialize } from '@/lib/searchparams'

type PaginatorProps = {
  limit?: number
  page?: number
  search?: string
  name?: string
}

export const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const fetchAPI = async (url: string, options: any) => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/fake/${url}`, options)

  if (!response.ok) {
    throw new Error('Failed to fetch API')
  }

  return response
}

// export async function createEvent(values: User) {
//   const data = await fetch(`${NEXT_PUBLIC_API_URL}/events`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(values)
//   })

//   const result = await data.json()
//   return result
// }

export async function getAllGroups({ limit, page, search }: PaginatorProps) {
  await delay(1000)

  const filters = {
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && { search })
  }

  const data = await fetchAPI(`groups${serialize({ ...filters })}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await data.json()
  return result
}

export async function getAllUsers({ limit, page, search }: PaginatorProps) {
  await delay(1000)

  const filters = {
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && { search })
  }

  const data = await fetchAPI(`users${serialize({ ...filters })}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await data.json()
  return result
}
