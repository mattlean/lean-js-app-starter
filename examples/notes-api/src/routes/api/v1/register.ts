import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { createJWT, hashPassword } from '../../../common/auth'
import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../common/error'
import { ServerError } from '../../../common/error'
import { prisma } from '../../../common/prisma'

const registerValidationChain = () => [
    body('username').isString(),
    body('password').isString(),
]

const router = Router()

/**
 * @openapi
 * /api/v1/register:
 *   post:
 *     description: Create a new user and create a new JSON web token.
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 default: user
 *               password:
 *                 type: string
 *                 default: password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Create a new account with valid user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: JSON_WEB_TOKEN
 *       400:
 *         description: Perform a bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *               example:
 *                 errors:
 *                   [
 *                     {
 *                       "type": "field",
 *                       "msg": "Invalid value",
 *                       "path": "username",
 *                       "location": "body",
 *                     },
 *                     {
 *                       "type": "field",
 *                       "msg": "Invalid value",
 *                       "path": "password",
 *                       "location": "body",
 *                     },
 *                   ]
 *       409:
 *         description: Attempt to claim a username that is already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *               example:
 *                 errors: ["Username already taken"]
 *     tags:
 *       - Authentication & Authorization
 */
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
                return next(new ServerError(409, 'Username already taken', err))
            }
            return next(err)
        }

        return res.json({ data: createJWT(user) })
    },
)

export { router as registerHandler }
