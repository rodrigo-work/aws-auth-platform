import { describe } from '@jest/globals'
import { Application } from '../app'

const app = new Application().init()

describe('Group Service', () => {
  // it('list groups', async () => {
  //   await supertest(app)
  //     .get('/group/list')
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body)
  //     })
  // })
  // it('create group', async () => {
  //   await supertest(app)
  //     .post('/group/create')
  //     .send({
  //       name: 'fake',
  //       description: 'fake group'
  //     })
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body)
  //     })
  // })
})
