import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { apiHandler } from './api'
import { globalErrorHandler } from './core/error'

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    server.use(morgan('dev'))
}

server.get('/', (req, res) =>
    res.send(`Notes API is live on port ${process.env.PORT_APP}`)
)

server.use('/api', apiHandler)

server.use(globalErrorHandler)

export { server }
