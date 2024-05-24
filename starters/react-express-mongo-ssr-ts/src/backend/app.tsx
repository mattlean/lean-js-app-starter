import compression from 'compression'
import express from 'express'
import path from 'path'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import {
    PATH_BACKEND_SRC,
    PATH_BUILD_DEV,
    PATH_FRONTEND_BUILD_DEV,
} from '../../PATHS'
import HelloWorld from '../frontend/HelloWorld'

const BUNDLED_BACK_BUILD_PATH = path.resolve(__dirname)
const BUNDLED_FRONT_BUILD_PATH = path.resolve(__dirname, '../frontend')
const BUNDLED_GENERATED_VIEWS_BUILD_PATH = path.resolve(
    __dirname,
    '../generated-views',
)

const app = express()

// Setup EJS templates
app.set('view engine', 'ejs')

// Use the generated views from the frontend build
const viewDirs = []
if (process.env.NODE_ENV === 'test') {
    viewDirs.push(
        `${PATH_BUILD_DEV}/generated-views`,
        `${PATH_BACKEND_SRC}/views`,
    )
} else {
    viewDirs.push(
        BUNDLED_GENERATED_VIEWS_BUILD_PATH,
        `${BUNDLED_BACK_BUILD_PATH}/views`,
    )
}
app.set('views', viewDirs)

// app.use(helmet()) // Middleware that enhances security by setting HTTP response headers

if (process.env.NODE_ENV === 'production') {
    app.use(compression()) // Middleware that compresses most response bodies
}

app.get('/', (req, res, next) => {
    // Server-side render the React app
    let serverSideRendering

    try {
        serverSideRendering = renderToString(
            <StrictMode>
                <HelloWorld />
            </StrictMode>,
        )
    } catch (err) {
        return next(err)
    }

    return res.render('index', {
        title: 'ljas-react-express-mongo-ssr-ts',
        content: serverSideRendering,
    })
})

// Serve the frontend build directory as static files
let frontBuildPath
if (process.env.NODE_ENV === 'test') {
    frontBuildPath = PATH_FRONTEND_BUILD_DEV
} else {
    frontBuildPath = BUNDLED_FRONT_BUILD_PATH
}
app.use('/', express.static(frontBuildPath))

export default app
