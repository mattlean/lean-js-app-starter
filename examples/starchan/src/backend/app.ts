import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createNotFoundErrorHandler, globalErrorHandler } from './core/error'
import { frontendHandler } from './routes'
import { apiHandler } from './routes/api'

const BUNDLED_BACK_BUILD_PATH = path.resolve(__dirname)
const BUNDLED_FRONT_BUILD_PATH = path.resolve(__dirname, '../frontend')

const app = express()

app.set('view engine', 'ejs')
app.set('views', [
    // Use the generated views from the frontend build
    `${BUNDLED_FRONT_BUILD_PATH}/generated-views`,
    `${BUNDLED_BACK_BUILD_PATH}/views`,
])

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve the frontend build as static files
app.use('/static', express.static(`${BUNDLED_FRONT_BUILD_PATH}/public`))

// Serve the files in the public directory in backend src/ as static files
app.use('/static', express.static(`${BUNDLED_BACK_BUILD_PATH}/public`))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', frontendHandler)

app.use('/api', apiHandler)

app.all('*', createNotFoundErrorHandler())

app.use(globalErrorHandler)

export default app
