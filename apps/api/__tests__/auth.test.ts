import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'
import { Application } from '../app'

const app = new Application().init()

describe('Auth Service', () => {
  it('health check returns 200', async () => {
    await supertest(app)
      .get('/auth/status')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Auth Service OK!' })
      })
  })

  it('auth/sign-in { email, password } returns 200 and tokens', async () => {
    await supertest(app)
      .post('/auth/sign-in')
      .send({
        email: 'me+fake@rodrigo3d.com',
        password: '123123'
      })
      .expect(200)
      .then((res) => {
        expect(res.body)
      })
  })
})
