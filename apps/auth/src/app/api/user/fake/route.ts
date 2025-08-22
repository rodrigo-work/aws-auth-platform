import { NextResponse } from 'next/server'

export function GET() {
  const data = {
    email: 'me@rodrigo.work',
    email_verified: 'true',
    name: 'Rodrigo Ribeiro',
    family_name: 'Ribeiro',
    given_name: 'Rodrigo',
    zoneinfo: 'America/Sao_Paulo',
    locale: 'en',
    profile: '[{"theme":"system","test":"testing"}]',
    birthdate: '1984-02-22',
    sub: '9428d408-b0f1-70d7-ed2b-c649d6bc5a3f',
    username: '9428d408-b0f1-70d7-ed2b-c649d6bc5a3f',
    auth2fa: false
  }

  return NextResponse.json(data)
}
