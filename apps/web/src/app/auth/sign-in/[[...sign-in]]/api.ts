/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers'

const fetchAPI = async (url: string, options: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    options
  )

  if (!response) {
    throw new Error('Failed to fetch API')
  }

  return response
}

export const handleSignUp = async (data: any) => {
  const cookieStore = await cookies()

  const response = await fetchAPI('auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (result.data.AccessToken) {
    // Define cookies seguros
    cookieStore.set('access_token', result.data.AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: result.data.ExpiresIn
    })

    cookieStore.set('id_token', result.data.IdToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: result.data.ExpiresIn
    })
  }

  return result

  // return response.status === 204
}
