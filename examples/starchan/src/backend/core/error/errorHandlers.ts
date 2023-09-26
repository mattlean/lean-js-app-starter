import { NextFunction, Request, Response } from 'express'

import {
    ServerError,
    genDefaultErrorMessage,
    isErrorPage,
    isServerError,
} from '.'

/** Creates an error handler that takes care of all requests to undefined routes. */
export const createNotFoundErrorHandler =
    (isApiNotFoundErrorHandler?: boolean) => (req: Request) => {
        const content = `${req.originalUrl} was not found.`
        const serverErr = isApiNotFoundErrorHandler
            ? new ServerError(404, content)
            : new ServerError(404, { content })
        throw serverErr
    }

/** API error handler that takes care of all errors and renders the response as JSON. */
export const apiErrorHandler = (
    err: Error | ServerError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err)
    }

    if (isServerError(err)) {
        return res.status(err.statusCode).json({ errors: err.errors })
    }

    return res.status(500).json({ errors: ['Internal server error'] })
}

/** Global error handler that takes care of all errors that might be encountered. */
export const globalErrorHandler = (
    err: Error | ServerError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err)
    }

    if (isServerError(err)) {
        let heading
        let content

        if (err.errors) {
            if (err.errors.length === 1) {
                if (typeof err.errors[0] === 'string') {
                    content = err.errors[0]
                } else if (isErrorPage(err.errors[0])) {
                    heading = err.errors[0].heading
                    content = err.errors[0].content
                } else if (err.errors[0].msg) {
                    content = err.errors[0].msg
                }
            }
        }

        if (!heading) {
            heading = genDefaultErrorMessage(err.statusCode)
            if (heading === content) {
                content = undefined
            }
        }

        return res.status(err.statusCode).render('error', {
            title: 'ljas-starchan',
            heading,
            content,
        })
    }

    return res.status(500).render('error', {
        title: 'ljas-starchan',
        heading: 'Internal server error',
        content: undefined,
    })
}
