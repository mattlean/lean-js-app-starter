import { NextFunction, Request, Response } from 'express'

import { MOCK_USER } from '../../routes/api/v1/__tests__/MOCK_DATA'
import { createJWT, protectMiddleware, verifyToken } from '../auth'

describe('JWT secret checks', () => {
    beforeEach(() => {
        delete process.env.JWT_SECRET
    })

    test('createJWT should error when JWT secret was not set', () => {
        expect(() => createJWT(MOCK_USER)).toThrow()
    })

    test('verifyToken should error when JWT secret was not set', () => {
        expect(() => verifyToken('foobar')).toThrow()
    })
})

describe('protectMiddleware', () => {
    beforeEach(() => {
        process.env.JWT_SECRET = 'sEcReT'
    })

    afterEach(() => {
        delete process.env.JWT_SECRET
    })

    it('sets user property on request object when token is valid', () => {
        const token = createJWT(MOCK_USER)
        const decodedToken = verifyToken(token)

        const mockReq: Partial<Request> = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
        const mockRes: Partial<Response> = {}
        const nextFn: NextFunction = jest.fn()

        protectMiddleware(mockReq as Request, mockRes as Response, nextFn)

        expect(nextFn).toHaveBeenCalledTimes(1)

        const mockReqUser = mockReq.user as DecodedJWT
        expect(mockReqUser.uuid).toBe(decodedToken.uuid)
        expect(mockReqUser.username).toBe(decodedToken.username)
        expect(mockReqUser.iat).toBe(decodedToken.iat)
    })

    it('throws error when bearer is missing', () => {
        const mockReq: Partial<Request> = { headers: {} }
        const mockRes: Partial<Response> = {}
        const nextFn: NextFunction = jest.fn()

        expect(() =>
            protectMiddleware(mockReq as Request, mockRes as Response, nextFn),
        ).toThrow(/unauthorized/i)
    })

    it('throws error when authorization header does not have a token', () => {
        const mockReq: Partial<Request> = {
            headers: { authorization: 'invalidauthnheader' },
        }
        const mockRes: Partial<Response> = {}
        const nextFn: NextFunction = jest.fn()

        expect(() =>
            protectMiddleware(mockReq as Request, mockRes as Response, nextFn),
        ).toThrow(/unauthorized/i)
    })

    it('throws error when invalid token is encountered', () => {
        const mockReq: Partial<Request> = {
            headers: { authorization: 'Bearer invalidtoken' },
        }
        const mockRes: Partial<Response> = {}
        const nextFn: NextFunction = jest.fn()

        expect(() =>
            protectMiddleware(mockReq as Request, mockRes as Response, nextFn),
        ).toThrow(/jwt malformed/i)
    })
})
