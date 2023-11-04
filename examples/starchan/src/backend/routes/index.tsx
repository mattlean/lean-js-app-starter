import { NextFunction, Request, Response, Router } from 'express'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'

import App from '../../frontend/app/App'
import { objRoutes } from '../../frontend/app/routes'
import { buildStore } from '../../frontend/common/redux'
import { apiSlice } from '../../frontend/features/api/apiSlice'
import { ServerError } from '../common/error'
import { validateErrorMiddleware } from '../common/error'
import { threadPageValidationChain } from '../common/validators'

const expressRouter = Router()

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
                'The Redux store for the request was not found'
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
                <StaticRouter location={req.url}>
                    <App />
                </StaticRouter>
            </Provider>
        ),
        preloadedState: JSON.stringify(res.locals.store.getState()).replace(
            /</g,
            '\\u003c'
        ),
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
    res.locals.store = buildStore()

    const page = typeof req.params.page === 'number' ? req.params.page : 1

    console.log('what am i', page)

    try {
        // Store thread list response in the the RTK Query cache
        await res.locals.store.dispatch(
            apiSlice.endpoints.getThreads.initiate(page)
        )
    } catch (err) {
        return next(err)
    }

    console.log('did i ever get here')

    return next()
}

/**
 * GET /
 * Server-side render the first page of the thread list.
 */
expressRouter.get(
    objRoutes[0].children[0].path,
    // threadListMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        const store = buildStore()

        const page = typeof req.params.page === 'number' ? req.params.page : 1

        console.log('what am i', page)

        try {
            // Store thread list response in the the RTK Query cache
            await store.dispatch(apiSlice.endpoints.getThreads.initiate(1))
        } catch (err) {
            return next(err)
        }

        console.log('did i ever get here')

        // return next()

        try {
            await Promise.all(
                store.dispatch(apiSlice.util.getRunningQueriesThunk())
            )
        } catch (err) {
            console.log('did i err', err)
            return next(err)
        }

        console.log('how about here')

        return res.render('index', {
            title: 'ljas-starchan',
            content: renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </Provider>
            ),
            preloadedState: JSON.stringify(store.getState()).replace(
                /</g,
                '\\u003c'
            ),
        })
    }
    // ssrMiddleware
)

/**
 * GET /:page
 * Server-side render pages 2-10 of the thread list.
 */
// expressRouter.get(
//     objRoutes[0].children[0].children[0].path,
//     threadPageValidationChain,
//     validateErrorMiddleware,
//     threadListMiddleware,
//     ssrMiddleware
// )

if (process.env.NODE_ENV !== 'production') {
    // Responds with a 500 error to test API error handling.
    // This is only available in non-production modes.
    expressRouter.get('/fail', () => {
        throw new Error()
    })
}

export { expressRouter as frontendHandler }
