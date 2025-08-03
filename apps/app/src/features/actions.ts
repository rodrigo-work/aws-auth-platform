// 'use server'

import { serialize } from '@/lib/searchparams'
import type { User } from './users/data/schema'

type PaginatorProps = {
  limit?: number
  page?: number
  search?: string
  name?: string
}

//const NEXT_PUBLIC_API_URL = 'http://localhost:3001/api'
const NEXT_PUBLIC_API_URL = 'http://localhost:3000/api/fake'
// const NEXT_PUBLIC_API_URL = 'https://scheduler-pro2.vercel.app/api'

export const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const fetchAPI = async (url: string, options: any) => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/${url}`, options)

  if (!response.ok) {
    throw new Error('Failed to fetch API')
  }

  return response
}

export async function createEvent(values: User) {
  const data = await fetch(`${NEXT_PUBLIC_API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

  const result = await data.json()
  return result
}

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
