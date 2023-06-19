import { Router } from 'express'

import { protectMiddleware } from '../../core/auth'
import { loginHandler } from './login'
import { meHandler } from './me'
import { noteHandler } from './note'
import { registerHandler } from './register'

const router = Router()

router.use('/ping', (req, res) =>
    res.setHeader('Content-Type', 'text/plain').send('pong')
)

router.use('/register', registerHandler)

router.use('/login', loginHandler)

router.use('/me', protectMiddleware, meHandler)

router.use('/notes', protectMiddleware, noteHandler)

export { router as v1Handler }
