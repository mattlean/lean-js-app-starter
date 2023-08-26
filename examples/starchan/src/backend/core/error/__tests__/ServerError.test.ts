import ServerError, { isErrorPage, isServerError } from '../ServerError'

const FOO_TXT = 'foo'
const BAR_TXT = 'bar'

describe('ServerError', () => {
    it('new ServerError instantiated with no args has expected defaults', () => {
        const serverErr = new ServerError()

        expect(serverErr.name).toBe('ServerError')
        expect(serverErr.type).toBe('misc')
        expect(serverErr.message).toBe('Internal server error')
        expect(serverErr.devErrors).toBeUndefined()
        expect(serverErr.errors).toHaveLength(1)
        expect(serverErr.errors[0]).toBe('Internal server error')
    })

    it('ServerError with inputDevErrs defined as an array will be directly assigned to the instance', () => {
        const err1 = new Error()
        const err2 = new Error()
        const serverErr = new ServerError(undefined, undefined, [err1, err2])

        expect(Array.isArray(serverErr.devErrors)).toBe(true)
        if (!Array.isArray(serverErr.devErrors)) {
            throw new Error('ServerError devErrors is not an array.')
        }

        expect(serverErr.devErrors[0]).toBe(err1)
        expect(serverErr.devErrors[1]).toBe(err2)
        expect(serverErr.devErrors).toHaveLength(2)
    })

    it('ServerError with inputDevErrs defined as a string will set it as the message and set it as an Error in devErrors', () => {
        const serverErr = new ServerError(undefined, undefined, FOO_TXT)

        expect(Array.isArray(serverErr.devErrors)).toBe(true)
        if (!Array.isArray(serverErr.devErrors)) {
            throw new Error(
                'Expected devErrors for a ServerError to be an array.'
            )
        }

        expect(serverErr.devErrors[0]).toBeInstanceOf(Error)
        if (!(serverErr.devErrors[0] instanceof Error)) {
            throw new Error(
                'Expected devErrors[0] for a ServerError to be an Error.'
            )
        }

        expect(serverErr.message).toBe(FOO_TXT)
        expect(serverErr.devErrors[0].message).toBe(FOO_TXT)
    })

    it('ServerError with inputDevErrs defined as an Error will set the message as the ServerError message and set it as an Error in devErrors', () => {
        const err = new Error(FOO_TXT)
        const serverErr = new ServerError(undefined, undefined, err)

        expect(Array.isArray(serverErr.devErrors)).toBe(true)
        if (!Array.isArray(serverErr.devErrors)) {
            throw new Error(
                'Expected devErrors for a ServerError to be an array.'
            )
        }

        expect(serverErr.devErrors[0]).toBeInstanceOf(Error)
        if (!(serverErr.devErrors[0] instanceof Error)) {
            throw new Error(
                'Expected devErrors[0] for a ServerError to be an Error.'
            )
        }

        expect(serverErr.message).toBe(FOO_TXT)
        expect(serverErr.devErrors[0]).toBe(err)
    })

    // TODO: test express-validator errors

    it('ServerError with inputErrs defined as an array will be directly assigned to the instance', () => {
        const serverErr = new ServerError(undefined, [FOO_TXT, BAR_TXT])

        expect(typeof serverErr.errors[0]).toBe('string')
        expect(serverErr.errors[0]).toBe(FOO_TXT)
        expect(serverErr.errors[1]).toBe(BAR_TXT)
        expect(serverErr.errors).toHaveLength(2)
    })

    it('ServerError with inputErrs defined as a string will set it as a string in errors', () => {
        const serverErr = new ServerError(undefined, FOO_TXT)

        expect(serverErr.errors[0]).toBe(FOO_TXT)
        expect(serverErr.errors).toHaveLength(1)
    })

    it('ServerError with inputErrs defined as an ErrorPage will set it as an ErrorPage in errors', () => {
        const serverErr = new ServerError(undefined, {
            heading: FOO_TXT,
            content: BAR_TXT,
        })

        expect(isErrorPage(serverErr.errors[0])).toBe(true)
        if (!isErrorPage(serverErr.errors[0])) {
            throw new Error(
                'Expected errors[0] for a ServerError to be an ErrorPage.'
            )
        }

        expect(serverErr.errors[0].heading).toBe(FOO_TXT)
        expect(serverErr.errors[0].content).toBe(BAR_TXT)
        expect(serverErr.errors).toHaveLength(1)
    })

    it('ServerError with type "auth" defaults everything to "Unauthorized"', () => {
        const serverErr = new ServerError('auth')

        expect(serverErr.message).toBe('Unauthorized')
        expect(serverErr.errors[0]).toBe('Unauthorized')
    })

    it('ServerError with type "notFound" defaults everything to "Not found"', () => {
        const serverErr = new ServerError('notFound')

        expect(serverErr.message).toBe('Not found')
        expect(serverErr.errors[0]).toBe('Not found')
    })

    it('ServerError with type "validation" defaults everything to "Invalid input"', () => {
        const serverErr = new ServerError('validation')

        expect(serverErr.message).toBe('Invalid input')
        expect(serverErr.errors[0]).toBe('Invalid input')
    })

    it('ServerError with type "misc" defaults everything to "Internal server error"', () => {
        const serverErr = new ServerError('misc')

        expect(serverErr.message).toBe('Internal server error')
        expect(serverErr.errors[0]).toBe('Internal server error')
    })
})

describe('ServerError utils', () => {
    it('isErrorPage returns false when a string is checked', () => {
        expect(isErrorPage('notanerrorpage')).toBe(false)
    })

    it('isErrorPage returns false when an empty object is checked', () => {
        expect(isErrorPage({})).toBe(false)
    })

    it('isErrorPage returns true when an ErrorPage with only a heading is checked', () => {
        expect(isErrorPage({ heading: FOO_TXT })).toBe(true)
    })

    it('isErrorPage returns true when an ErrorPage with only a content is checked', () => {
        expect(isErrorPage({ content: BAR_TXT })).toBe(true)
    })

    it('isErrorPage returns true when an ErrorPage with both a heading and content is checked', () => {
        expect(isErrorPage({ heading: FOO_TXT, content: BAR_TXT })).toBe(true)
    })

    it('isServerError returns false when a normal Error is checked', () => {
        expect(isServerError(new Error())).toBe(false)
    })

    it('isServerError returns true when a ServerError is checked', () => {
        expect(isServerError(new ServerError())).toBe(true)
    })
})
