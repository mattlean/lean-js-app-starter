import { Router } from 'express'
import { body } from 'express-validator'

import { createJWT, hashPassword } from '../../core/auth'
import { prisma } from '../../core/db'
import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../core/error'
import { ServerError } from '../../core/error'

const registerValidationChain = () => [
    body('username').isString(),
    body('password').isString(),
]

const router = Router()

// Create a new user
router.post(
    '/',
    registerValidationChain(),
    validateErrorMiddleware,
    async (req, res, next) => {
        let password
        try {
            password = await hashPassword(req.body.password)
        } catch (err) {
            return next(err)
        }

        let user
        try {
            user = await prisma.user.create({
                data: {
                    username: req.body.username,
                    password,
                },
            })
        } catch (err) {
            if (
                isPrismaKnownRequestError(err) &&
                err.code === 'P2002' &&
                err.meta?.target?.[0] === 'username'
            ) {
                return next(
                    new ServerError('validation', 'Username already taken', err)
                )
            }

            return next(err)
        }

        return res.json({ data: createJWT(user) })
    }
)

export { router as registerHandler }
