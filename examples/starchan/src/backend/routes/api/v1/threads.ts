import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator'
import { isObjectIdOrHexString } from 'mongoose'

import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../core/error'
import { ServerError } from '../../../core/error'
import { prisma } from '../../../core/prisma'

const router = Router()

const threadValidationChain = () => [
    body('subject').isString().optional({ values: 'null' }),
    body('comment').isString().notEmpty(),
]

/**
 * @openapi
 * /api/v1/threads:
 *   post:
 *     description: Create a thread
 */
router.post(
    '/',
    threadValidationChain(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        return next(new ServerError(500))
        let data
        try {
            data = await prisma.thread.create({
                data: {
                    subject: req.body.subject,
                    comment: req.body.comment,
                },
            })
        } catch (err) {
            return next(err)
        }

        return res.status(201).json({ data })
    }
)

/**
 * @openapi
 * /api/v1/threads:
 *   get:
 *     description: List threads
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let data
    try {
        data = await prisma.thread.findMany()
    } catch (err) {
        return next(err)
    }

    return res.json({ data })
})

/**
 * @openapi
 * /api/v1/threads/{id}:
 *   get:
 *     description: Read a thread
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    if (!isObjectIdOrHexString(req.params.id)) {
        return next(
            new ServerError(
                404,
                undefined,
                'Route parameter is not a valid ObjectId.'
            )
        )
    }

    let data
    try {
        data = await prisma.thread.findUniqueOrThrow({
            where: { id: req.params.id },
        })
    } catch (err) {
        if (
            err instanceof Error &&
            isPrismaKnownRequestError(err) &&
            err.code === 'P2025' &&
            err.message.match(/no thread found/i)
        ) {
            return next(new ServerError(404, undefined, err))
        }
        return next(err)
    }

    return res.json({ data })
})

// Create a new reply in a thread
router.post('/:uuid/reply', (req, res) => res.json({ data: {} }))

export { router as threadHandler }
