import { NextFunction, Request, Response, Router } from 'express'
import { param, validationResult } from 'express-validator'
import { renderToString } from 'react-dom/server'

import { objRoutes } from '../../frontend/app/routes'
import { buildStore } from '../../frontend/common/redux'
import { apiSlice } from '../../frontend/features/api/apiSlice'
import { genFormError } from '../../frontend/features/errors/formErrorSlice'
import { ServerError, validateErrorMiddleware } from '../common/error'
import { buildPreloadedState } from '../common/util'
import ServerReactApp from '../views/ServerReactApp'
import {
    createThreadMiddleware,
    threadValidationChain,
    validateThreadObjectIdMiddleware,
} from './middlewares'

if (
    !objRoutes[0] ||
    !objRoutes[0].children ||
    !objRoutes[0].children[0].path ||
    !objRoutes[0].children[0].children ||
    !objRoutes[0].children[0].children[0].path ||
    !objRoutes[0].children[1].path
) {
    throw new Error('Error loading server-side rendering-related routes.')
}

const router = Router()

/**
 * Express middleware that creates the Redux store for the response.
 */
const reduxStoreMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.locals.store = buildStore()
    return next()
}

/**
 * Express middleware that waits for all RTK queries to finish.
 */
const rtkQueryProcessMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!res.locals.store) {
        return next(
            new ServerError(
                500,
                undefined,
                'The Redux store for the response was not found'
            )
        )
    }

    try {
        await Promise.all(
            res.locals.store.dispatch(apiSlice.util.getRunningQueriesThunk())
        )
    } catch (err) {
        return next(err)
    }

    return next()
}

/**
 * Express middleware that performs server-side rendering.
 */
const ssrMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!res.locals.store) {
        return next(
            new ServerError(
                500,
                undefined,
                'The Redux store for the response was not found'
            )
        )
    }

    let serverSideRendering
    try {
        serverSideRendering = renderToString(
            <ServerReactApp location={req.url} store={res.locals.store} />
        )
    } catch (err) {
        return next(err)
    }

    return res.render('index', {
        title: 'ljas-starchan',
        content: serverSideRendering,
        preloadedState: buildPreloadedState(res.locals.store.getState()),
    })
}

/**
 * Express middleware that pre-fetches the thread list data.
 */
const threadListMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!res.locals.store) {
        return next(
            new ServerError(
                500,
                undefined,
                'The Redux store for the response was not found'
            )
        )
    }

    const page = parseInt(req.params.page) || 1

    try {
        await res.locals.store.dispatch(
            apiSlice.endpoints.getThreads.initiate(page)
        )
    } catch (err) {
        return next(err)
    }

    return next()
}

/**
 * GET /
 * Server-side render the first page of the thread list.
 */
router.get(
    objRoutes[0].children[0].path,
    reduxStoreMiddleware,
    threadListMiddleware,
    rtkQueryProcessMiddleware,
    ssrMiddleware
)

/**
 * POST /
 * Create a thread and redirect to the new thread's page.
 * This usually executes when a user is browsing with JavaScript disabled.
 */
router.post(
    '/',
    threadValidationChain(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            // Skip the remaining middleware functions and pass control to the form error route
            res.locals.validationErrs = errors.array()
            return next('route')
        }

        return next()
    },
    createThreadMiddleware,
    // The request was submitted by a JavaScript-disabled user so
    // redirect them to the server-side rendered thread page
    (req: Request, res: Response) =>
        res.redirect(303, `/thread/${res.locals.threadData.id}`)
)

/**
 * POST /
 * A specialized handler that server-side renders the thread list with a
 * new thread form error when a validation error is encountered.
 * This usually executes when a user is browsing with JavaScript disabled.
 */
router.post(
    '/',
    reduxStoreMiddleware,
    threadListMiddleware,
    rtkQueryProcessMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        res.locals.store.dispatch(genFormError(res.locals.validationErrs))
        next()
    },
    ssrMiddleware
)

/**
 * GET /:page
 * Server-side render pages 2-10 of the thread list.
 */
router.get(
    `${objRoutes[0].children[0].children[0].path}(\\d+)`,
    param('page').isInt({ min: 1, max: 10 }).optional(),
    validateErrorMiddleware,
    reduxStoreMiddleware,
    threadListMiddleware,
    rtkQueryProcessMiddleware,
    ssrMiddleware
)

/**
 * GET /thread/:threadId
 * Server-side render a thread page.
 */
router.get(
    `/${objRoutes[0].children[1].path}`,
    validateThreadObjectIdMiddleware,
    reduxStoreMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!res.locals.store) {
            return next(
                new ServerError(
                    500,
                    undefined,
                    'The Redux store for the response was not found'
                )
            )
        }

        try {
            await res.locals.store.dispatch(
                apiSlice.endpoints.getThread.initiate(req.params.threadId)
            )
        } catch (err) {
            return next(err)
        }

        return next()
    },
    rtkQueryProcessMiddleware,
    ssrMiddleware
)

/**
 * POST /thread/:threadId
 * Create a reply to a thread.
 * This usually executes when a user is browsing with JavaScript disabled.
 */
// TODO:

if (process.env.NODE_ENV !== 'production') {
    // Responds with a 500 error to test API error handling.
    // This is only available in non-production modes.
    router.get('/fail', () => {
        throw new Error()
    })
}

export { router as frontendHandler }
