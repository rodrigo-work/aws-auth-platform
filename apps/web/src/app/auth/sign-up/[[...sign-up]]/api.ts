/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers'

const fetchAPI = async (url: string, options: any) => {
  const response = await fetch(`${process.env.API_URL}/${url}`, options)

  if (!response) {
    throw new Error('Failed to fetch API')
  }

  return response
}

export const handleSignUp = async (data: any) => {
  const cookieStore = await cookies()

  const response = await fetchAPI('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (result.AccessToken) {
    // Define cookies seguros
    cookieStore.set('accessToken', result.AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: result.ExpiresIn * 1000 // em milissegundos
    })

    cookieStore.set('refreshToken', result.RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    })

    cookieStore.set('idToken', result.IdToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    })
  }
  //
  //   console.log('response', await response.json())
  //
  // console.log('response', result)
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return result

  // return response.status === 204
}
