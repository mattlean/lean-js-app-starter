import { NextFunction, Request, Response, Router } from 'express'

import { ServerError } from '../../../common/error'
import { prisma } from '../../../common/prisma'

const router = Router()

/**
 * Express middleware that generates response data from a user.
 */
const genUserDataMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.user) {
        return next(new ServerError(401))
    }

    let user
    try {
        user = await prisma.user.findUniqueOrThrow({
            where: { uuid: req.user.uuid },
        })
    } catch (err) {
        if (err instanceof Error) {
            return next(new ServerError(401, undefined, err))
        }
        return next(err)
    }

    res.locals.data = { ...user }
    delete res.locals.data.password
    delete res.locals.data.createdAt
    delete res.locals.data.updatedAt

    return next()
}

/**
 * @openapi
 * /api/v1/me:
 *   get:
 *     description: Get data for the current user.
 *     summary: Get user data
 *     responses:
 *       200:
 *         description: Get user data while authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Attempt to get user data while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               'Guest access':
 *                 value:
 *                   errors: ["Unauthorized"]
 *               'Invalid token':
 *                 value:
 *                   errors: ["Invalid token"]
 *     tags:
 *       - Authentication & Authorization
 */
router.get('/', genUserDataMiddleware, async (req, res) =>
    res.json({ data: res.locals.data }),
)

export { router as meHandler }
