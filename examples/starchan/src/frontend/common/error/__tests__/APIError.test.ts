import { APIError, isAPIError, isAPIErrorRes } from '..'

const FOO_TXT = 'foo'
const BAR_TXT = 'bar'

describe('APIError', () => {
    it('no args has expected defaults', () => {
        const apiErr = new APIError()

        expect(apiErr.name).toBe('APIError')
        expect(apiErr.statusCode).toBe(500)
        expect(apiErr.message).toBe('Internal server error')
        expect(apiErr.devErrors).toBeUndefined()
        expect(apiErr.errors).toHaveLength(1)

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(apiErr.errors[0]).toBe('Internal server error')
    })

    it('inputDevErrs defined as an array will be directly assigned to the instance', () => {
        const err1 = new Error()
        const err2 = new Error()
        const apiErr = new APIError(undefined, undefined, [err1, err2])

        expect(Array.isArray(apiErr.devErrors)).toBe(true)
        if (!Array.isArray(apiErr.devErrors)) {
            throw new Error('Expected devErrors for a APIError to be an array.')
        }

        expect(apiErr.devErrors[0]).toBe(err1)
        expect(apiErr.devErrors[1]).toBe(err2)
        expect(apiErr.devErrors).toHaveLength(2)
    })

    it('inputDevErrs defined as a string will set it as the message and set it as an Error in devErrors', () => {
        const apiErr = new APIError(undefined, undefined, FOO_TXT)

        expect(Array.isArray(apiErr.devErrors)).toBe(true)
        if (!Array.isArray(apiErr.devErrors)) {
            throw new Error('Expected devErrors for a APIError to be an array.')
        }

        expect(apiErr.devErrors[0]).toBeInstanceOf(Error)
        if (!(apiErr.devErrors[0] instanceof Error)) {
            throw new Error(
                'Expected devErrors[0] for a APIError to be an Error.'
            )
        }

        expect(apiErr.message).toBe(FOO_TXT)
        expect(apiErr.devErrors[0].message).toBe(FOO_TXT)
    })

    it('inputDevErrs defined as an Error will set the message as the APIError message and set it as an Error in devErrors', () => {
        const err = new Error(FOO_TXT)
        const apiErr = new APIError(undefined, undefined, err)

        expect(Array.isArray(apiErr.devErrors)).toBe(true)
        if (!Array.isArray(apiErr.devErrors)) {
            throw new Error('Expected devErrors for a APIError to be an array.')
        }

        expect(apiErr.devErrors[0]).toBeInstanceOf(Error)
        if (!(apiErr.devErrors[0] instanceof Error)) {
            throw new Error(
                'Expected devErrors[0] for a APIError to be an Error.'
            )
        }

        expect(apiErr.message).toBe(FOO_TXT)
        expect(apiErr.devErrors[0]).toBe(err)
    })

    it('inputErrs defined as an array will be directly assigned to the instance', () => {
        const apiErr = new APIError(undefined, [FOO_TXT, BAR_TXT])

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(typeof apiErr.errors[0]).toBe('string')
        expect(apiErr.errors[0]).toBe(FOO_TXT)
        expect(apiErr.errors[1]).toBe(BAR_TXT)
        expect(apiErr.errors).toHaveLength(2)
    })

    it('inputErrs defined as a string will set it as a string in errors', () => {
        const apiErr = new APIError(undefined, FOO_TXT)

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(apiErr.errors[0]).toBe(FOO_TXT)
        expect(apiErr.errors).toHaveLength(1)
    })

    it('statusCode 401 defaults message and errors to "Unauthorized"', () => {
        const apiErr = new APIError(401)

        expect(apiErr.message).toBe('Unauthorized')

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(apiErr.errors[0]).toBe('Unauthorized')
    })

    it('statusCode 404 defaults message and errors to "Not found"', () => {
        const apiErr = new APIError(404)

        expect(apiErr.message).toBe('Not found')

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(apiErr.errors[0]).toBe('Not found')
    })

    it('statusCode 400 defaults message and errors to "Bad request"', () => {
        const apiErr = new APIError(400)

        expect(apiErr.message).toBe('Bad request')

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(apiErr.errors[0]).toBe('Bad request')
    })

    it('statusCode 500 defaults message and errors to "Internal server error"', () => {
        const apiErr = new APIError(500)

        expect(apiErr.message).toBe('Internal server error')

        expect(Array.isArray(apiErr.errors)).toBe(true)
        if (!Array.isArray(apiErr.errors)) {
            throw new Error('Expected errors for a APIError to be an array.')
        }

        expect(apiErr.errors[0]).toBe('Internal server error')
    })
})

describe('APIError utils', () => {
    it('isAPIErrorRes returns false when a string is checked', () => {
        expect(isAPIErrorRes('notanerrorpage')).toBe(false)
    })

    it('isAPIErrorRes returns false when an empty object is checked', () => {
        expect(isAPIErrorRes({})).toBe(false)
    })

    it('isAPIErrorRes returns true when an APIErrorRes is checked', () => {
        expect(isAPIErrorRes({ errors: ['Thread was not found.'] })).toBe(true)
    })

    it('isAPIError returns false when a normal Error is checked', () => {
        expect(isAPIError(new Error())).toBe(false)
    })

    it('isAPIError returns true when a APIError is checked', () => {
        expect(isAPIError(new APIError())).toBe(true)
    })
})
