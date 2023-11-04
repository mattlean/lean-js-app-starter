import { Router } from 'express'

import { protectMiddleware } from '../../../common/auth'
import { docsHandler } from './docs'
import { loginHandler } from './login'
import { meHandler } from './me'
import { noteHandler } from './notes'
import { registerHandler } from './register'

const router = Router()

/**
 * @openapi
 * /api/v1/ping:
 *   get:
 *     description: Responds with pong if the API is online.
 *     summary: Test if the API is online
 *     responses:
 *       200:
 *         description: Pong message
 *         content:
 *           text/plain:
 *             type: string
 *             example: pong
 *     tags:
 *       - Debug
 */
router.get('/ping', (req, res) =>
    res.setHeader('Content-Type', 'text/plain').send('pong')
)

if (process.env.NODE_ENV !== 'production') {
    /**
     * @openapi
     * /api/v1/fail:
     *   get:
     *     description: Responds with a 500 error to test API error handling. This is only available in non-production modes.
     *     summary: Debug the API error handler
     *     responses:
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 errors:
     *                   $ref: "#/components/schemas/ErrorResponse"
     *               example:
     *                 errors: ["Internal server error"]
     *     tags:
     *       - Debug
     */
    router.get('/fail', () => {
        throw new Error()
    })
}

router.use('/docs', docsHandler)

router.use('/register', registerHandler)

router.use('/login', loginHandler)

router.use('/me', protectMiddleware, meHandler)

router.use('/notes', protectMiddleware, noteHandler)

export { router as v1Handler }
