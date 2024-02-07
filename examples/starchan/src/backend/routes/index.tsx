import { NextFunction, Request, Response, Router } from 'express'
import { param, validationResult } from 'express-validator'
import { renderToString } from 'react-dom/server'

import { objRoutes } from '../../frontend/app/routes'
import { buildStore } from '../../frontend/common/redux'
import { apiSlice } from '../../frontend/features/api/apiSlice'
import { genFormError } from '../../frontend/features/errors/formErrorSlice'
import {
    setComment,
    setSubject,
} from '../../frontend/features/formInputs/formInputsSlice'
import { ServerError, validateErrorMiddleware } from '../common/error'
import { buildPreloadedState } from '../common/util'
import ServerReactApp from '../views/ServerReactApp'
import {
    commentValidationChain,
    createReplyMiddleware,
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
 * Express middleware that checks for express-validator errors and branches
 * to a fallback route if necessary.
 */
const branchFormErrorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        // Skip the remaining middleware functions and pass control to the form error route
        res.locals.validationErrs = errors.array()
        return next('route')
    }

    return next()
}

/**
 * Express middleware that creates the Redux store for the response.
 */
const buildReduxStoreMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.locals.store = buildStore()
    return next()
}

/**
 * Express middleware that creates a form error message in the Redux store.
 */
const preloadFormErrorMiddleware = (
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

    if (res.locals.validationErrs) {
        res.locals.store.dispatch(genFormError(res.locals.validationErrs))

        if (req.body.subject) {
            res.locals.store.dispatch(setSubject(req.body.subject))
        }

        if (req.body.comment) {
            res.locals.store.dispatch(setComment(req.body.comment))
        }
    } else {
        console.error(
            'Expected to encounter validation errors. Server-side render will continue without a form error message.'
        )
    }

    return next()
}

/**
 * Express middleware that preloads the thread list data.
 */
const preloadThreadListMiddleware = async (
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
 * Express middleware that preloads the thread page data.
 */
const preloadThreadPageMiddleware = async (
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
        await res.locals.store.dispatch(
            apiSlice.endpoints.getThread.initiate(req.params.threadId)
        )
    } catch (err) {
        return next(err)
    }

    return next()
}

/**
 * Express middleware that waits for all RTK queries to finish.
 */
const processRtkQueriesMiddleware = async (
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

    if (res.locals.validationErrs) {
        res.status(400)
    } else if (req.method === 'POST') {
        res.status(201)
    }

    return res.render('index', {
        title: 'ljas-starchan',
        content: serverSideRendering,
        preloadedState: buildPreloadedState(res.locals.store.getState()),
    })
}

/**
 * GET /
 * Server-side render the first page of the thread list.
 */
router.get(
    objRoutes[0].children[0].path,
    buildReduxStoreMiddleware,
    preloadThreadListMiddleware,
    processRtkQueriesMiddleware,
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
    // If the following middleware encounters a validation error, the remaining
    // middlewares are skipped and control is passed to the next route
    branchFormErrorMiddleware,
    createThreadMiddleware,
    (req: Request, res: Response) => {
        if (!res.locals.threadData) {
            throw new ServerError(500, 'Thread data could not be read.')
        }

        return res.redirect(303, `/thread/${res.locals.threadData.id}`)
    }
)

/**
 * POST / (Error Handler)
 * A specialized route that only executes when validation errors are encountered
 * during the thread creation process. This falls back the response to a server-side
 * rendering of the thread list where its new thread form will display an error message.
 * This usually executes when a user is browsing with JavaScript disabled.
 */
router.post(
    '/',
    buildReduxStoreMiddleware,
    preloadThreadListMiddleware,
    processRtkQueriesMiddleware,
    preloadFormErrorMiddleware,
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
    buildReduxStoreMiddleware,
    preloadThreadListMiddleware,
    processRtkQueriesMiddleware,
    ssrMiddleware
)

/**
 * GET /thread/:threadId
 * Server-side render a thread page.
 */
router.get(
    `/${objRoutes[0].children[1].path}`,
    validateThreadObjectIdMiddleware,
    buildReduxStoreMiddleware,
    preloadThreadPageMiddleware,
    processRtkQueriesMiddleware,
    ssrMiddleware
)

/**
 * POST /thread/:threadId
 * Create a reply to a thread.
 * This usually executes when a user is browsing with JavaScript disabled.
 */
router.post(
    `/${objRoutes[0].children[1].path}`,
    validateThreadObjectIdMiddleware,
    buildReduxStoreMiddleware,
    commentValidationChain(),
    // If the following middleware encounters a validation error, the remaining
    // middlewares are skipped and control is passed to the next route
    branchFormErrorMiddleware,
    createReplyMiddleware,
    preloadThreadPageMiddleware,
    processRtkQueriesMiddleware,
    ssrMiddleware
)

/**
 * POST /thread/:threadId (Error Handler)
 * A specialized route that only executes when validation errors are encountered
 * during the reply creation process. This falls back the response to a server-side
 * rendering of the thread page where its new reply form will display an error message.
 * This usually executes when a user is browsing with JavaScript disabled.
 */
router.post(
    `/${objRoutes[0].children[1].path}`,
    preloadThreadPageMiddleware,
    processRtkQueriesMiddleware,
    preloadFormErrorMiddleware,
    ssrMiddleware
)

if (process.env.NODE_ENV !== 'production') {
    // Responds with a 500 error to test API error handling.
    // This is only available in non-production modes.
    router.get('/fail', () => {
        throw new Error()
    })
}

export { router as frontendHandler }
