import request from 'supertest'

import app from './app'

test('returns "Hello World!" when request is sent to /', async () => {
    expect.assertions(2)

    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.text).toMatchSnapshot()
})
