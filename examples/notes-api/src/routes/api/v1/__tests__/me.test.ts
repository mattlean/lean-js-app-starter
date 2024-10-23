import request from 'supertest'

import app from '../../../../app'
import { protectMiddleware } from '../../../../common/auth'
import {
    genProtectMiddlewareAuthImpl,
    prismaMock,
    restoreProtectMiddlewareImpl,
} from '../../../../common/util/jest'
import { MOCK_REQ_USER, MOCK_USER } from './MOCK_DATA'

jest.mock('../../../../common/auth')

const protectMiddlewareMock = jest.mocked(protectMiddleware)

beforeEach(() => protectMiddlewareMock.mockReset())

test('returns user when authorized', async () => {
    protectMiddlewareMock.mockImplementation(
        genProtectMiddlewareAuthImpl(MOCK_REQ_USER),
    )
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(MOCK_USER)

    expect.assertions(3)

    const res = await request(app).get('/api/v1/me')

    expect(res.status).toBe(200)
    expect(res.body.data.uuid).toBe(MOCK_USER.uuid)
    expect(res.body.data.username).toBe(MOCK_USER.username)
})

test('returns 401 when unauthorized', async () => {
    protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

    expect.assertions(3)

    const res = await request(app).get('/api/v1/me')

    expect(res.status).toBe(401)
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0]).toBe('Unauthorized')
})
