////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import { base, Faker, pt_BR } from '@faker-js/faker'
import { matchSorter } from 'match-sorter' // For filtering
import { type NextRequest, NextResponse } from 'next/server'

const faker = new Faker({
  locale: [pt_BR, base]
})

// Mock current time
const currentTime = new Date().toISOString()

// Define the shape of Event data
type Guest = {
  id: string
  email: string
}

type EventGuest = {
  id: string
  eventId: string
  guestId: string
  confirmed: boolean
  guest: Guest
}

type Event = {
  id: string
  name: string
  description: string
  location: string
  startTime: Date
  endTime: Date
  timezone: string
  createdAt: string
  updatedAt: string
  guests: EventGuest[]
}

// Mock event data store
const fakeEvents = {
  records: [] as Event[], // Holds the list of event objects

  // Initialize with sample data
  initialize() {
    const NUM_EVENTS = 50
    const SAMPLE_EVENTS: Event[] = []

    // Sets para garantir unicidade
    const usedGuestEmails = new Set<string>()

    // Função para gerar guest único (email único)
    function generateUniqueGuest(): any {
      let email: string
      do {
        email = faker.internet
          .email({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          })
          .toLowerCase()
      } while (usedGuestEmails.has(email))
      usedGuestEmails.add(email)

      return {
        // id: faker.string.uuid(),
        email: faker.helpers.arrayElement([
          'superadmin',
          'admin',
          'editor',
          'viewer',
          'guest',
          'manager'
        ])
      }
    }

    // Gera evento com convidados únicos
    function generateRandomEventData(): any {
      // Cria uma lista de convidados únicos para o evento
      const maxGuestsForEvent = 4 // Math.floor(NUM_EVENTS / 2)
      const guestsPool: Guest[] = Array.from({ length: maxGuestsForEvent }, () =>
        generateUniqueGuest()
      )

      // Seleciona convidados aleatórios para o evento
      const guestCount = faker.number.int({ min: 1, max: guestsPool.length })
      const selectedGuests = faker.helpers.shuffle(guestsPool).slice(0, guestCount)

      const guests: any[] = selectedGuests.map((g) => ({
        name: faker.helpers.arrayElement([
          'superadmin',
          'admin',
          'editor',
          'viewer',
          //  'guest',
          'manager'
        ]),
        description: faker.lorem.sentence(),
        precedence: 0, //faker.number.int({ min: 0, max: 5 }),
        createdAt: faker.date.between({ from: '2023-01-01', to: '2026-12-31' }).toISOString(),
        updatedAt: faker.date.recent().toISOString()
      }))

      const uuid = faker.string.uuid()
      const fullName = [faker.person.firstName(), faker.person.lastName()]

      return {
        sub: uuid,
        username: uuid,
        email: faker.internet
          .email({
            firstName: fullName[0],
            lastName: fullName[1]
          })
          .toLowerCase(),

        given_name: fullName[0],
        family_name: fullName[1],
        email_verified: faker.helpers.arrayElement([true, false]),
        address: faker.location.street(),
        birthdate: faker.date.birthdate().toISOString(),
        gender: faker.person.sexType(),
        locale: 'locale',
        middle_name: 'middle_name',
        // biome-ignore lint/style/useTemplate: <explanation>
        name: fullName[0] + ' ' + fullName[1],
        nickname: 'nickname',
        phone_number: faker.phone.number({ style: 'national' }),
        phone_number_verified: faker.helpers.arrayElement([true, false]),
        picture: faker.image.avatar(),
        preferred_username: 'preferred_username',
        profile: 'https://example.com/users/mariasilva',
        updated_at: '1691068800',
        website: 'https://mariasilva.dev',
        zoneinfo: faker.location.timeZone(),
        createdAt: faker.date.between({ from: '2023-01-01', to: '2026-12-31' }).toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        enabled: faker.helpers.arrayElement([true, false]),
        user_status: faker.helpers.arrayElement([
          'UNCONFIRMED',
          'CONFIRMED',
          'ARCHIVED',
          'COMPROMISED',
          'UNKNOWN',
          'RESET_REQUIRED',
          'FORCE_CHANGE_PASSWORD'
        ]),
        //       "MFAOptions": [
        //         {
        //           "DeliveryMedium": "SMS" | "EMAIL",
        //           "AttributeName": "string"
        //         }
        //       ]

        // role: faker.helpers.arrayElement([
        //   'superadmin',
        //   'admin',
        //   'editor',
        //   'viewer',
        //   'guest',
        //   'manager'
        // ]),
        // groups: generateUniqueGuest()
        groups: [
          {
            name: 'guest',
            description: 'Grupo padrão, para todos usuarios.',
            precedence: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          ...guests
        ]
      }
    }

    // Gera todos os eventos
    for (let i = 1; i <= NUM_EVENTS; i++) {
      SAMPLE_EVENTS.push(generateRandomEventData())
    }

    this.records = SAMPLE_EVENTS
  },

  // Get all events with optional location filtering and search
  getAll({ search }: { search?: string }) {
    let events = [...this.records]

    if (search) {
      events = matchSorter(events, search ?? '', {
        keys: ['groups[0].name', 'name', 'description', 'location']
      })
    }

    return events
  },

  // Get paginated results with optional category filtering and search
  async getEvents({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number
    limit?: number
    search?: string
  }) {
    const allEvents = await this.getAll({ search })
    const totalEvents = allEvents.length

    const offset = (page - 1) * limit
    const paginatedEvents = allEvents.slice(offset, offset + limit)

    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total: totalEvents,
      page,
      totalPages: Math.ceil(totalEvents / limit),
      limit,
      data: paginatedEvents
    }
  }
}

// Endpoint GET padrão para Next.js API routes
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const search = String(searchParams.get('search'))

  const filters = {
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && search !== 'null' && { search })
  }

  const data = await fakeEvents.getEvents(filters)

  return NextResponse.json(data)
}

// Inicializa os dados
fakeEvents.initialize()

// {
//   ;('sub')
//   : "c438b468-4031-7089-7d21-b0d40c82f0d4",
// "email": "maria.silva@example.com",
// "email_verified": "true",
// "given_name": "Maria",
// "family_name": "Silva",
// "address": "Rua das Flores, 123, São Paulo, SP",
// "birthdate": "1990-05-20",
// "gender": "Female",
// "locale": "pt-BR",
// "middle_name": "Fernanda",
// "name": "Maria Fernanda Silva",
// "nickname": "Mari",
// "phone_number": "+5511999998888",
// "phone_number_verified": "true",
// "preferred_username": "mariasilva90",
// "profile": "https://example.com/users/mariasilva",
// "updated_at": "1691068800",
// "website": "https://mariasilva.dev",
// "zoneinfo": "America/Sao_Paulo",
// "Username": "c438b468-4031-7089-7d21-b0d40c82f0d4",
// "Enabled": true,
// "UserStatus": "FORCE_CHANGE_PASSWORD",
// "UserCreateDate": "2025-08-04T06:34:47.930Z",
// "UserLastModifiedDate": "2025-08-04T06:34:47.930Z",
// "groups": []
// }
// ,
// {
//   ;('sub')
//   : "f4185498-60e1-7077-5244-c7301eca97ff",
// "email": "me@rodrigo3d.com",
// "given_name": "Rodrigo",
// "family_name": "Ribeiro",
// "Username": "f4185498-60e1-7077-5244-c7301eca97ff",
// "Enabled": true,
// "UserStatus": "FORCE_CHANGE_PASSWORD",
// "UserCreateDate": "2025-08-05T07:34:55.855Z",
// "UserLastModifiedDate": "2025-08-05T07:34:55.855Z",
// "groups": [
//   ;('name')
//   : "superadmin",
// "description": "[ROOT]",
// "precedence": 0,
// "createdAt": "2025-08-06T00:13:18.963Z",
// "updatedAt": "2025-08-06T00:27:21.280Z"
//   ,
//   ;('name')
//   : "admin",
// "description": "Acesso total ao sistema. Pode criar, editar, excluir tudo.",
// "precedence": 0,
// "createdAt": "2025-08-06T00:12:03.570Z",
// "updatedAt": "2025-08-06T00:27:30.721Z"
//   ]
// }
