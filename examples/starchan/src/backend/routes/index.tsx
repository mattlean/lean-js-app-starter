import { NextFunction, Request, Response, Router } from 'express'
import { param } from 'express-validator'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

import App from '../../frontend/app/App'
import { jsxRoutes } from '../../frontend/app/routes'
import { objRoutes } from '../../frontend/app/routes'
import { buildStore } from '../../frontend/common/redux'
import { apiSlice } from '../../frontend/features/api/apiSlice'
import { ServerError, validateErrorMiddleware } from '../common/error'

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

    next()
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

    next()
}

/**
 * Express middleware that waits for all RTK queries to finish and then performs server-side rendering.
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

    try {
        await Promise.all(
            res.locals.store.dispatch(apiSlice.util.getRunningQueriesThunk())
        )
    } catch (err) {
        return next(err)
    }

    return res.render('index', {
        title: 'ljas-starchan',
        content: renderToString(
            <Provider store={res.locals.store}>
                <App>
                    <StaticRouter location={req.url}>
                        <Routes>{jsxRoutes}</Routes>
                    </StaticRouter>
                </App>
            </Provider>
        ),
        preloadedState: JSON.stringify(res.locals.store.getState()).replace(
            /</g,
            '\\u003c'
        ),
    })
}

/**
 * GET /
 * Server-side render the first page of the thread list.
 */
router.get(
    objRoutes[0].children[0].path,
    reduxStoreMiddleware,
    threadListMiddleware,
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
    ssrMiddleware
)

/**
 * GET /thread/:threadId
 * Server-side render a thread page.
 */
router.get(
    `/${objRoutes[0].children[1].path}`,
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

        next()
    },
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
