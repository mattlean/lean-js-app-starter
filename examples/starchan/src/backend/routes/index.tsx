import { Router } from 'express'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

import App from '../../frontend/app/App'
import { routes } from '../../frontend/app/routes'

const router = Router()

// Server-side render React app
router.get('/', (req, res) =>
    res.render('index', {
        title: 'ljas-starchan',
        content: renderToString(
            <StrictMode>
                <App>
                    <StaticRouter location={req.url}>
                        <Routes>{routes}</Routes>
                    </StaticRouter>
                </App>
            </StrictMode>
        ),
    })
)

if (process.env.NODE_ENV !== 'production') {
    // Responds with a 500 error to test API error handling.
    // This is only available in non-production modes.
    router.get('/fail', () => {
        throw new Error()
    })
}

export { router as frontendHandler }
