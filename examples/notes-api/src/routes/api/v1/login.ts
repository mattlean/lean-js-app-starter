import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { createJWT, verifyPassword } from '../../../core/auth'
import { ServerError } from '../../../core/error'
import { validateErrorMiddleware } from '../../../core/error'
import { prisma } from '../../../core/prisma'

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
    async (req: Request, res: Response, next: NextFunction) => {
        let user
        try {
            user = await prisma.user.findUniqueOrThrow({
                where: { username: req.body.username },
            })
        } catch (err) {
            if (err instanceof Error) {
                return next(new ServerError('auth', 'Invalid credentials', err))
            }
            return next(err)
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
            if (err instanceof Error) {
                return next(new ServerError('auth', 'Invalid credentials', err))
            }
            return next(err)
        }

        return res.json({ data: createJWT(user) })
    }
)

export { router as loginHandler }
