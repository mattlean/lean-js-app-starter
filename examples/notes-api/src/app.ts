import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { apiHandler } from './api'
import { globalErrorHandler } from './core/error'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => res.send('Notes API is live at: /api/v1'))

app.use('/api', apiHandler)

app.use(globalErrorHandler)

export default app
