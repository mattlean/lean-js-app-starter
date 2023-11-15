import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { PATH_BACKEND_SRC, PATH_BUILD, PATH_FRONTEND_BUILD } from '../../PATHS'
import {
    createNotFoundErrorHandler,
    globalErrorHandler,
    ssrErrorHandler,
} from './common/error'
import { frontendHandler } from './routes'
import { apiHandler } from './routes/api'

const BUNDLED_BACK_BUILD_PATH = path.resolve(__dirname)
const BUNDLED_FRONT_BUILD_PATH = path.resolve(__dirname, '../frontend')
const BUNDLED_GENERATED_VIEWS_BUILD_PATH = path.resolve(
    __dirname,
    '../generated-views'
)

const app = express()

// Setup EJS templates
app.set('view engine', 'ejs')

const viewDirs = []
if (process.env.NODE_ENV === 'test') {
    // Use the generated views from the frontend build
    viewDirs.push(`${PATH_BUILD}/generated-views`, `${PATH_BACKEND_SRC}/views`)
} else {
    viewDirs.push(
        // Use the generated views from the frontend build
        BUNDLED_GENERATED_VIEWS_BUILD_PATH,
        `${BUNDLED_BACK_BUILD_PATH}/views`
    )
}
app.set('views', viewDirs)

app.use(cors()) // Middleware that enables CORS
app.use(express.json()) // Middleware that parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })) // Middleware that parses incoming requests with urlencoded payloads

// Enable HTTP request logger middleware when running in certain environments
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('common'))
}

// Mount router on / paths with handlers that respond with template renderings
app.use('/', frontendHandler)

// Serve the frontend build directory and the backend public directory as static files
let frontBuildPath
if (process.env.NODE_ENV === 'test') {
    frontBuildPath = PATH_FRONTEND_BUILD
} else {
    frontBuildPath = BUNDLED_FRONT_BUILD_PATH
}
app.use('/', express.static(frontBuildPath))

let backPublicPath
if (process.env.NODE_ENV === 'test') {
    backPublicPath = `${PATH_BACKEND_SRC}/public`
} else {
    backPublicPath = `${BUNDLED_BACK_BUILD_PATH}/public`
}
app.use('/static', express.static(backPublicPath))

// Mount router on /api paths with handlers that respond with JSON
app.use('/api', apiHandler)

// Handle unknown paths with a not found error handler
app.all('*', createNotFoundErrorHandler())

// Catch all uncaught errors with the SSR error handler
app.use(ssrErrorHandler)

// A catastrophic error happened, so handle it with the global error handler
app.use(globalErrorHandler)

export default app
