import { Router } from 'express'

import { threadHandler } from './threads'

const router = Router()

router.get('/ping', (req, res) =>
    res.setHeader('Content-Type', 'text/plain').send('pong')
)

router.use('/threads', threadHandler)

export { router as v1Handler }
