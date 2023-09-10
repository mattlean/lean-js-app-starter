import { Prisma } from '@prisma/client'
import request from 'supertest'

import app from '../../../../app'
import { prismaMock } from '../../../../util/test'
import { MOCK_USER, MOCK_USER_PLAIN_TXT_PASS } from './MOCK_DATA'

test('returns JWT when proper request payload is sent', async () => {
    prismaMock.user.create.mockResolvedValue(MOCK_USER)

    expect.assertions(3)

    const res = await request(app).post('/api/v1/register').send({
        username: MOCK_USER.username,
        password: MOCK_USER_PLAIN_TXT_PASS,
    })

    expect(res.status).toBe(200)
    expect(typeof res.body.data).toBe('string')
    expect(res.body.data).toBeDefined()
})

test('returns 400 when request payload is empty', async () => {
    expect.assertions(7)

    const res = await request(app).post('/api/v1/register')

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

    const res = await request(app)
        .post('/api/v1/register')
        .send({ username: MOCK_USER.username })

    expect(res.status).toBe(400)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].path).toBe('password')
    expect(res.body.errors[0].msg).toBe('Invalid value')
})

test('returns 400 when request payload is missing username', async () => {
    expect.assertions(5)

    const res = await request(app)
        .post('/api/v1/register')
        .send({ password: MOCK_USER_PLAIN_TXT_PASS })

    expect(res.status).toBe(400)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].path).toBe('username')
    expect(res.body.errors[0].msg).toBe('Invalid value')
})

test("returns 400 when request payload's username is not a string", async () => {
    expect.assertions(5)

    const res = await request(app)
        .post('/api/v1/register')
        .send({ username: 123, password: MOCK_USER_PLAIN_TXT_PASS })

    expect(res.status).toBe(400)
    expect(Array.isArray(res.body.errors)).toBe(true)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].path).toBe('username')
    expect(res.body.errors[0].msg).toBe('Invalid value')
})

test('returns 400 when username is already taken', async () => {
    prismaMock.user.create
        .mockResolvedValueOnce(MOCK_USER)
        .mockImplementationOnce(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                '\nInvalid `prisma.user.create()` invocation:\n\n\nUnique constraint failed on the fields: (`username`)',
                {
                    clientVersion: '4.15.0',
                    code: 'P2002',
                    meta: {
                        target: ['username'],
                    },
                }
            )
            throw err
        })

    expect.assertions(5)

    const res1 = await request(app).post('/api/v1/register').send({
        username: MOCK_USER.username,
        password: MOCK_USER_PLAIN_TXT_PASS,
    })

    expect(res1.status).toBe(200)

    const res2 = await request(app).post('/api/v1/register').send({
        username: MOCK_USER.username,
        password: MOCK_USER_PLAIN_TXT_PASS,
    })

    expect(res2.status).toBe(400)
    expect(Array.isArray(res2.body.errors)).toBe(true)
    expect(res2.body.errors).toHaveLength(1)
    expect(res2.body.errors[0]).toBe('Username already taken')
})
