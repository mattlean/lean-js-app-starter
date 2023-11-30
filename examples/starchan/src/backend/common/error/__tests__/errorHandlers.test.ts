import request from 'supertest'

import app from '../../../app'
import { ssrErrorHandlerTestInjection } from '../ssrErrorHandlerTestInjection'

jest.mock('../ssrErrorHandlerTestInjection')

const ssrErrorHandlerTestInjectionMock = jest.mocked(
    ssrErrorHandlerTestInjection
)

describe('Not found error handlers', () => {
    it('handles a non-API route with no handler using the regular not found error handler', async () => {
        expect.assertions(2)

        const res = await request(app).get('/definitely-not-found')

        expect(res.status).toBe(404)
        expect(res.text).toMatchSnapshot()
    })

    it('handles an API route with no handler using the API not found error handler', async () => {
        expect.assertions(2)

        const res = await request(app).get('/api/v1/definitely-not-found')

        expect(res.status).toBe(404)
        expect(res.body.errors[0]).toBe(
            '/api/v1/definitely-not-found was not found.'
        )
    })
})

describe('API error handler', () => {
    it('returns a 500 error when the fail route is requested', async () => {
        expect.assertions(2)

        const res = await request(app).get('/api/v1/fail')

        expect(res.status).toBe(500)
        expect(res.body.errors[0]).toBe('Internal server error')
    })
})

describe('SSR error handler', () => {
    it('returns a 500 error when the fail route is requested', async () => {
        expect.assertions(2)

        const res = await request(app).get('/fail')

        expect(res.status).toBe(500)
        expect(res.text).toMatchSnapshot()
    })
})

describe('Global error handler', () => {
    beforeEach(() => ssrErrorHandlerTestInjectionMock.mockReset())

    it('returns a 500 error when the fail route is requested', async () => {
        expect.assertions(2)

        ssrErrorHandlerTestInjectionMock.mockImplementation(() => {
            throw new Error(
                'Trigger the global error handler from the SSR error handler'
            )
        })

        const res = await request(app).get('/fail')

        expect(res.status).toBe(500)
        expect(res.text).toMatchSnapshot()
    })
})
