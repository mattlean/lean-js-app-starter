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

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     description: Validate user credentials and create new a JSON web token.
 *     summary: Login with an existing user
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
 *         description: Login with valid user credentials
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
 *     tags:
 *       - Authentication & Authorization
 */
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
                return next(new ServerError(401, 'Invalid credentials', err))
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
                return next(new ServerError(401, 'Invalid credentials', err))
            }
            return next(err)
        }

        return res.json({ data: createJWT(user) })
    }
)

export { router as loginHandler }
