import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { PATH_FRONTEND_BUILD } from '../../PATHS'
import { createNotFoundErrorHandler, globalErrorHandler } from './core/error'
import { frontendHandler } from './routes'
import { apiHandler } from './routes/api'

const app = express()

app.set('view engine', 'ejs')
app.set('views', [
    // Use the generated views from the frontend build
    `${PATH_FRONTEND_BUILD}/generated-views`,
    path.resolve(__dirname, 'views'),
])

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve the frontend build as static files
app.use('/static', express.static(`${PATH_FRONTEND_BUILD}/public`))

// Serve the files in the public directory in backend src/ as static files
app.use('/static', express.static(path.resolve(__dirname, 'public')))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', frontendHandler)

app.use('/api', apiHandler)

app.all('*', createNotFoundErrorHandler())

app.use(globalErrorHandler)

export default app
