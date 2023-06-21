import { Router } from 'express'

import { prisma } from '../../core/db'
import { ServerError } from '../../core/error'

const router = Router()

/**
 * Express middleware that generates response data from a user.
 */
const genUserDataMiddleware = async (req, res, next) => {
    let user
    try {
        user = await prisma.user.findUniqueOrThrow({
            where: { uuid: req.user.uuid },
        })
    } catch (err) {
        return next(new ServerError('auth', undefined, err))
    }

    res.locals.data = { ...user }
    delete res.locals.data.password
    delete res.locals.data.createdAt
    delete res.locals.data.updatedAt

    return next()
}

// Validate user credentials & create new session
router.get('/', genUserDataMiddleware, async (req, res) =>
    res.json({ data: res.locals.data })
)

export { router as meHandler }
