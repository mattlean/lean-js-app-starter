import { NextFunction, Request, Response } from 'express'
import { renderToString } from 'react-dom/server'

import { ServerError, isErrorPageData, isServerError } from '.'
import { genDefaultErrorMessage } from '../../../common/error'
import { isAPIError } from '../../../frontend/common/error'
import { buildStore } from '../../../frontend/common/redux'
import { setAppErrors } from '../../../frontend/features/errors/appErrorsSlice'
import ServerReactApp from '../../views/ServerReactApp'
import { buildPreloadedState } from '../util'
import { ssrErrorHandlerTestInjection } from './ssrErrorHandlerTestInjection'

/** Creates an error handler that takes care of all requests to undefined routes. */
export const createNotFoundErrorHandler =
    (isApiNotFoundErrorHandler?: boolean) => (req: Request) => {
        const content = `${req.originalUrl} was not found.`
        const serverErr = isApiNotFoundErrorHandler
            ? new ServerError(404, content)
            : new ServerError(404, { content })
        throw serverErr
    }

/** API error handler intended to handle all errors with a JSON response. */
export const apiErrorHandler = (
    err: Error | ServerError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (process.env.NODE_ENV !== 'test') {
        // Hide error messages from clogging the test outputs
        console.error(err)
    }

    if (isServerError(err)) {
        return res.status(err.statusCode).json({ errors: err.errors })
    }

    return res.status(500).json({ errors: ['Internal server error'] })
}

/**
 * SSR global error handler intended to handle all errors that might be encountered
 * with a server-side rendering of the React app.
 */
export const ssrErrorHandler = (
    err: Error | ServerError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (process.env.NODE_ENV === 'test') {
        ssrErrorHandlerTestInjection()
    }

    const store = buildStore()
    let statusCode

    if (isServerError(err) || isAPIError(err)) {
        statusCode = err.statusCode

        let heading
        let content

        if (err.errors) {
            if (err.errors.length === 1) {
                if (typeof err.errors[0] === 'string') {
                    // Error is a string
                    content = err.errors[0]
                } else if (isErrorPageData(err.errors[0])) {
                    // Error is an error page
                    heading = err.errors[0].heading
                    content = err.errors[0].content
                } else if (err.errors[0].msg) {
                    // Error is an express-validator ValidationError
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

        store.dispatch(setAppErrors([{ heading, content }]))
    } else {
        statusCode = 500
        store.dispatch(setAppErrors([{ heading: genDefaultErrorMessage(500) }]))
    }

    let serverSideRendering
    try {
        serverSideRendering = renderToString(
            <ServerReactApp location={req.url} store={store} />
        )
    } catch (err) {
        return next(err)
    }

    if (process.env.NODE_ENV !== 'test') {
        // Hide error messages from clogging the test outputs
        console.error(err)
    }

    return res.status(statusCode).render('index', {
        title: 'Error | ljas-starchan',
        content: serverSideRendering,
        preloadedState: buildPreloadedState(store.getState()),
    })
}

/**
 * Global error handler intended to handle all errors that might be encountered
 * with a template rendering.
 */
export const globalErrorHandler = (
    err: Error | ServerError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (process.env.NODE_ENV !== 'test') {
        // Hide error messages from clogging the test outputs
        console.error(err)
    }

    let statusCode
    let heading
    let content

    if (isServerError(err)) {
        statusCode = err.statusCode

        if (err.errors) {
            if (err.errors.length === 1) {
                if (typeof err.errors[0] === 'string') {
                    // Error is a string
                    content = err.errors[0]
                } else if (isErrorPageData(err.errors[0])) {
                    // Error is an error page
                    heading = err.errors[0].heading
                    content = err.errors[0].content
                } else if (err.errors[0].msg) {
                    // Error is an express-validator ValidationError
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
    } else {
        statusCode = 500
        heading = genDefaultErrorMessage(500)
    }

    return res.status(statusCode).render('error', {
        title: 'ljas-starchan',
        heading,
        content,
    })
}
