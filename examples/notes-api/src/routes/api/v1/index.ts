import { Router } from 'express'

import { protectMiddleware } from '../../../core/auth'
import {
    apiErrorHandler,
    createNotFoundErrorHandler,
} from '../../../core/error'
import { loginHandler } from './login'
import { meHandler } from './me'
import { noteHandler } from './notes'
import { registerHandler } from './register'

const router = Router()

router.get('/ping', (req, res) =>
    res.setHeader('Content-Type', 'text/plain').send('pong')
)

if (process.env.NODE_ENV !== 'production') {
    router.get('/fail', () => {
        throw new Error()
    })
}

router.use('/register', registerHandler)

router.use('/login', loginHandler)

router.use('/me', protectMiddleware, meHandler)

router.use('/notes', protectMiddleware, noteHandler)

router.all('*', createNotFoundErrorHandler(true))

router.use(apiErrorHandler)

export { router as v1Handler }
