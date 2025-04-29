import { Metadata } from 'next/types'
import { SignUpComponent } from './sign-up-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account'
}

export default async function SignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <SignUpComponent />
      </div>
    </div>
  )
}
