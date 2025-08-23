// ****************************************************************************
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
// ****************************************************************************

/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import { base, Faker, pt_BR } from '@faker-js/faker'
import { matchSorter } from 'match-sorter'
import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const faker = new Faker({
  locale: [pt_BR, base]
})

type Group = {
  roles: string[]
  name: string
  description: string
  precedence: number
  createdAt: string
  updatedAt: string
}

const fakeEvents = {
  records: [] as Group[], // Holds the list of event objects

  initialize() {
    const SAMPLE_GROUPS: Group[] = []

    function generateGroupData(group: any): Group {
      return {
        ...group,
        precedence: faker.number.int({ min: 0, max: 5 }),
        createdAt: faker.date.between({ from: '2023-01-01', to: '2026-12-31' }).toISOString(),
        updatedAt: faker.date.recent().toISOString()
        // users
      }
    }

    // Genetate all groups
    for (const group of GROUPS) {
      SAMPLE_GROUPS.push(generateGroupData(group))
    }

    this.records = SAMPLE_GROUPS
  },

  getAll({ search }: { search?: string }) {
    let groups = [...this.records]

    if (search) {
      groups = matchSorter(groups, search, {
        keys: ['name', 'description']
      })
    }

    return groups
  },

  getGroups({ page = 1, limit = 10, search }: { page?: number; limit?: number; search?: string }) {
    const allGroup = this.getAll({ search })
    const totalGroup = allGroup.length

    const offset = (page - 1) * limit
    const paginatedGroup = allGroup.slice(offset, offset + limit)

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample data groups for testing and learning purposes',
      total: totalGroup,
      page,
      totalPages: Math.ceil(totalGroup / limit),
      limit,
      data: paginatedGroup
    }
  }
}

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const search = String(searchParams.get('search'))

  const filters = {
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && search !== 'null' && { search })
  }

  const data = fakeEvents.getGroups(filters)

  return NextResponse.json(data)
}

const GROUPS = [
  {
    roles: ['admin', 'superuser', 'manage_system'],
    name: 'Administrator',
    description: 'Full access to all system features and settings.'
  },
  {
    roles: ['user', 'access_basic_features'],
    name: 'User',
    description: 'Standard user with access to core functionality.'
  },
  {
    roles: ['guest', 'read_only'],
    name: 'Guest',
    description: 'Limited access, usually read-only or temporary access.'
  },
  {
    roles: ['moderate_content', 'manage_users_limited'],
    name: 'Moderator',
    description: 'Can review content or manage user behavior within limits.'
  },
  {
    roles: ['access_dev_tools', 'view_logs', 'manage_api'],
    name: 'Developer',
    description: 'Access to development and debugging tools, logs, and API configs.'
  },
  {
    roles: ['view_tickets', 'manage_support_cases'],
    name: 'Support',
    description: 'Support staff with access to user issues and troubleshooting tools.'
  },
  {
    roles: ['view_audit_logs', 'read_sensitive_data'],
    name: 'Auditor',
    description: 'Read-only access to system logs and sensitive audit information.'
  },
  {
    roles: ['manage_team', 'view_reports'],
    name: 'Manager',
    description: 'Can oversee teams, access reports, and manage team-related data.'
  },
  {
    roles: ['view_billing', 'manage_invoices'],
    name: 'Finance',
    description: 'Access to billing, payments, and financial reports.'
  },
  {
    roles: ['manage_employees', 'view_personal_data'],
    name: 'HR',
    description: 'Access to employee records and HR-specific data.'
  },
  {
    roles: ['api_access', 'token_authentication'],
    name: 'API Client',
    description: 'Non-human users (like services) using tokens to access the system API.'
  }
]

fakeEvents.initialize()
