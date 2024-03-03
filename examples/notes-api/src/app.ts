import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import { createNotFoundErrorHandler, globalErrorHandler } from './common/error'
import { frontendHandler } from './routes'
import { apiHandler } from './routes/api'

const BUNDLED_BUILD_PATH = path.resolve(__dirname)

const app = express()

// Setup EJS templates
app.set('view engine', 'ejs')
app.set('views', [`${BUNDLED_BUILD_PATH}/views`])

app.use(cors()) // Middleware that enables CORS
app.use(express.json()) // Middleware that parses incoming requests with JSON payloads
app.use(helmet()) // Middleware that enhances security by setting HTTP response headers

if (process.env.NODE_ENV === 'production') {
    app.use(compression()) // Middleware that compresses most response bodies
}

// Enable HTTP request logger middleware when running in certain environments
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('common'))
}

// Mount router on / paths with handlers that respond with template renderings
app.use('/', frontendHandler)

// Mount router on /api paths with handlers that respond with JSON
app.use('/api', apiHandler)

// Handle unknown paths with a not found error handler
app.all('*', createNotFoundErrorHandler())

// Catch all uncaught errors with a global error handler
app.use(globalErrorHandler)

export default app
