import { Router } from 'express'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'

import App from '../../frontend/app/App'
import { buildStore } from '../../frontend/common/redux'
import { apiSlice } from '../../frontend/features/api/apiSlice'

const expressRouter = Router()

// Server-side render React app
expressRouter.get('/', async (req, res, next) => {
    const store = buildStore()

    let result
    try {
        result = await store.dispatch(apiSlice.endpoints.getThreads.initiate(1))
    } catch (err) {
        return next(err)
    }

    try {
        await Promise.all(
            store.dispatch(apiSlice.util.getRunningQueriesThunk())
        )
    } catch (err) {
        return next(err)
    }

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
})

if (process.env.NODE_ENV !== 'production') {
    // Responds with a 500 error to test API error handling.
    // This is only available in non-production modes.
    expressRouter.get('/fail', () => {
        throw new Error()
    })
}

export { expressRouter as frontendHandler }
