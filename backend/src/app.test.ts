import request from 'supertest'

import app from './app'

describe('app', () => {
  it('responds "Hello, World!"', async () => {
    expect.assertions(2)

    const res = await request(app).get('/')

    expect(res.status).toEqual(200)
    expect(res.text).toBe('Hello, World!')
  })
})
