import { Router } from 'express'
import { body } from 'express-validator'

import { createJWT, verifyPassword } from '../../core/auth'
import { prisma } from '../../core/db'
import { ServerError } from '../../core/error'
import { validateErrorMiddleware } from '../../core/error'

const router = Router()

const loginValidationChain = () => [
    body('username').isString(),
    body('password').isString(),
]

// Validate user credentials & create new session
router.post(
    '/',
    loginValidationChain(),
    validateErrorMiddleware,
    async (req, res, next) => {
        let user
        try {
            user = await prisma.user.findUniqueOrThrow({
                where: { username: req.body.username },
            })
        } catch (err) {
            return next(new ServerError('auth', 'Invalid credentials', err))
        }

        try {
            const isValidPassword = await verifyPassword(
                req.body.password,
                user.password
            )

            if (!isValidPassword) {
                throw new Error('Invalid password encountered')
            }
        } catch (err) {
            return next(new ServerError('auth', 'Invalid credentials', err))
        }

        return res.json({ data: createJWT(user) })
    }
)

export { router as loginHandler }
