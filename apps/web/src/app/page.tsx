'use client'

import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:5001'

export default function Page() {
  const [name, setName] = useState<string>('')
  const [response, setResponse] = useState<{ message: string } | null>(null)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    setResponse(null)
    setError(undefined)
  }, [name])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await fetch(`${API_HOST}/message/${name}`)
      const response = await result.json()
      setResponse(response)
    } catch (err) {
      console.error(err)
      setError('Unable to fetch response')
    }
  }

  const onReset = () => {
    setName('')
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Hello World</h1>
          <form onSubmit={onSubmit}>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Message" />
              <Button type="submit">Send</Button>
            </div>
          </form>
          {error && (
            <div>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}
          {response && (
            <div>
              <h3>Greeting</h3>
              <p>{response.message}</p>
              <Button onClick={onReset}>Reset</Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
