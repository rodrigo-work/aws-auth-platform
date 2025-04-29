import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'
import { Application } from '../app'

const app = new Application().init()

describe('Server', () => {
  it('health check returns 200', async () => {
    await supertest(app)
      .get('/status')
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true)
      })
  })

  it('message endpoint says hello', async () => {
    await supertest(app)
      .get('/message/rodrigo3d')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'hello rodrigo3d' })
      })
  })
})
