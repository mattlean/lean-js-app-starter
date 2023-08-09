import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { pageHandler } from './routes'
import { apiHandler } from './routes/api'

// import { globalErrorHandler } from './core/error'

const server = express()

server.set('view engine', 'ejs')
server.set('views', [
    // Use the generated views from the frontend build
    path.join(__dirname, '../../build/frontend/generated-views'),
    path.join(__dirname, 'views'),
])

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Serve the frontend build as static files
server.use(
    '/static',
    express.static(path.join(__dirname, '../../build/frontend/public'))
)
server.use('/static', express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'development') {
    server.use(morgan('dev'))
}

server.use('/', pageHandler)

server.use('/api', apiHandler)

// server.use(globalErrorHandler)

export { server }
