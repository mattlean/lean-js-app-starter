import { Prisma } from '@prisma/client'
import request from 'supertest'

import { server } from '../../../server'
import { prismaMock } from '../../../util/test'
import { MOCK_USER, MOCK_USER_PLAIN_TXT_PASS } from './MOCK_DATA'

test('returns JWT when valid login is sent', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(MOCK_USER)

    expect.assertions(3)

    const res = await request(server).post('/api/v1/login').send({
        username: MOCK_USER.username,
        password: MOCK_USER_PLAIN_TXT_PASS,
    })

    expect(res.status).toBe(200)
    expect(typeof res.body.data).toBe('string')
    expect(res.body.data).toBeDefined()
})

test('returns 400 when request payload is empty', async () => {
    expect.assertions(7)

    const res = await request(server).post('/api/v1/login')

    expect(res.status).toBe(400)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(2)
    expect(res.body.errors[0].path).toBe('username')
    expect(res.body.errors[0].msg).toBe('Invalid value')
    expect(res.body.errors[1].path).toBe('password')
    expect(res.body.errors[1].msg).toBe('Invalid value')
})

test('returns 400 when request payload is missing password', async () => {
    expect.assertions(5)

    const res = await request(server)
        .post('/api/v1/login')
        .send({ username: MOCK_USER.username })

    expect(res.status).toBe(400)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].path).toBe('password')
    expect(res.body.errors[0].msg).toBe('Invalid value')
})

test('returns 400 when request payload is missing username', async () => {
    expect.assertions(5)

    const res = await request(server)
        .post('/api/v1/login')
        .send({ password: MOCK_USER_PLAIN_TXT_PASS })

    expect(res.status).toBe(400)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].path).toBe('username')
    expect(res.body.errors[0].msg).toBe('Invalid value')
})

test('returns 401 when username does not exist', async () => {
    prismaMock.user.findUniqueOrThrow.mockImplementation(() => {
        const err = new Prisma.PrismaClientKnownRequestError('No User found', {
            clientVersion: '4.15.0',
            code: 'P2025',
        })
        throw err
    })

    expect.assertions(4)

    const res = await request(server).post('/api/v1/login').send({
        username: 'invalidusername',
        password: 'invalidpassword',
    })

    expect(res.status).toBe(401)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0]).toBe('Invalid credentials')
})

test('should return 401 when password is incorrect', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(MOCK_USER)

    expect.assertions(4)

    const res = await request(server).post('/api/v1/login').send({
        username: MOCK_USER.username,
        password: 'invalidpassword',
    })

    expect(res.status).toBe(401)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0]).toBe('Invalid credentials')
})
