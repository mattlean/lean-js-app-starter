import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { createJWT, hashPassword } from '../../../core/auth'
import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../core/error'
import { ServerError } from '../../../core/error'
import { prisma } from '../../../core/prisma'

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
    async (req: Request, res: Response, next: NextFunction) => {
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
                err instanceof Error &&
                isPrismaKnownRequestError(err) &&
                err.code === 'P2002' &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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
