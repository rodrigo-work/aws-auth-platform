import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'
import { Application } from '../app'

const app = new Application().init()

describe('Health service', () => {
  it('health check returns 200', async () => {
    await supertest(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true)
      })
  })

  it('health returns body', async () => {
    await supertest(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ status: 'ok' })
      })
  })
})
