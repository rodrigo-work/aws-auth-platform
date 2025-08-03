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

type Event = {
  name: string
  description: string
  createdAt: string
  precedence: number
  updatedAt: string
  guests: any[]
  users: any[]
}

// Mock event data store
const fakeEvents = {
  records: [] as any[], // Holds the list of event objects

  // Initialize with sample data
  initialize() {
    const NUM_EVENTS = ['superadmin', 'admin', 'editor', 'viewer', 'guest', 'manager']
    const SAMPLE_EVENTS: Event[] = []

    // Sets para garantir unicidade
    const usedGuestEmails = new Set<string>()

    // Função para gerar guest único (email único)
    function generateUniqueGuest(): Guest {
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
        id: faker.string.uuid(),
        email
      }
    }

    // Gera evento com convidados únicos
    function generateRandomEventData(name: string): any {
      // Cria uma lista de convidados únicos para o evento
      const maxGuestsForEvent = Math.floor(NUM_EVENTS.length * 2)
      const guestsPool: any[] = Array.from({ length: maxGuestsForEvent }, () =>
        generateUniqueGuest()
      )

      // Seleciona convidados aleatórios para o evento
      const guestCount = faker.number.int({ min: 1, max: guestsPool.length })
      const selectedGuests = faker.helpers.shuffle(guestsPool).slice(0, guestCount)

      const guests: any[] = selectedGuests.map((g) => ({
        sub: faker.string.uuid(),
        email: faker.internet
          .email({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          })
          .toLowerCase(),
        createdAt: faker.date.between({ from: '2023-01-01', to: '2026-12-31' }).toISOString(),
        updatedAt: faker.date.recent().toISOString()

        // eventId,
        // guestId: g.id,
        // confirmed: faker.helpers.arrayElement([true, false])
        // guest: {
        //   id: g.id,
        //   email: g.email
        // }
      }))

      return {
        name, // faker.word.words(1), //generateUniqueEventName(),
        description: faker.lorem.lines({ min: 1, max: 3 }),
        precedence: faker.number.int({ min: 0, max: 5 }),
        createdAt: faker.date.between({ from: '2023-01-01', to: '2026-12-31' }).toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        users: guests
      }
    }

    // Gera todos os eventos
    for (let i = 1; i <= NUM_EVENTS.length; i++) {
      SAMPLE_EVENTS.push(generateRandomEventData(NUM_EVENTS[i - 1]))
    }

    this.records = SAMPLE_EVENTS
  },

  // Get all events with optional location filtering and search
  getAll({ search }: { search?: string }) {
    let events = [...this.records]

    if (search) {
      events = matchSorter(events, search ?? '', {
        keys: ['id', 'name', 'description', 'location']
      })
    }

    return events
  },

  // Get paginated results with optional category filtering and search
  getEvents({ page = 1, limit = 10, search }: { page?: number; limit?: number; search?: string }) {
    const allEvents = this.getAll({ search })
    const totalEvents = allEvents.length

    const offset = (page - 1) * limit
    const paginatedEvents = allEvents.slice(offset, offset + limit)

    return {
      success: true,
      time: currentTime,
      message: 'Sample data groups for testing and learning purposes',
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
