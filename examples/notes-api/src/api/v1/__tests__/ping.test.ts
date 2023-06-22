import request from 'supertest'

import { server } from '../../../server'

test('returns "pong" when request is sent', async () => {
    expect.assertions(2)

    const res = await request(server).get('/api/v1/ping')

    expect(res.status).toBe(200)
    expect(res.text).toBe('pong')
})
