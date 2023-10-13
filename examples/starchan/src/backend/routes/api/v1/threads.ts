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
    let result
    try {
        result = await prisma.thread.findMany({
            include: {
                replies: {
                    orderBy: { createdAt: 'asc' },
                    take: -5,
                },
            },
        })
    } catch (err) {
        return next(err)
    }

    return res.json({
        data: result.map((t) => ({
            ...t,
            replies: Array.isArray(t.replies)
                ? t.replies.map((r) => ({
                      ...r,
                      threadId: undefined,
                  }))
                : t.replies,
        })),
    })
})

/**
 * @openapi
 * /api/v1/threads/{threadId}:
 *   get:
 *     description: Read a thread
 */
router.get(
    '/:threadId',
    async (req: Request, res: Response, next: NextFunction) => {
        if (!isObjectIdOrHexString(req.params.threadId)) {
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
                where: { id: req.params.threadId },
                include: {
                    replies: {
                        orderBy: { createdAt: 'asc' },
                    },
                },
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
    }
)

/**
 * @openapi
 * /api/v1/threads/{threadId}/reply:
 *   get:
 *     description: Create a reply to a thread
 */
router.post(
    '/:threadId/reply',
    async (req: Request, res: Response, next: NextFunction) => {
        if (!isObjectIdOrHexString(req.params.threadId)) {
            return next(
                new ServerError(
                    404,
                    undefined,
                    'Route parameter is not a valid ObjectId.'
                )
            )
        }

        try {
            await prisma.thread.findUniqueOrThrow({
                where: { id: req.params.threadId },
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

        let result
        try {
            result = await prisma.reply.create({
                data: {
                    comment: req.body.comment,
                    threadId: req.params.threadId,
                },
                include: {
                    thread: {
                        include: {
                            replies: {
                                orderBy: { createdAt: 'asc' },
                            },
                        },
                    },
                },
            })
        } catch (err) {
            return next(err)
        }

        return res.status(201).json({
            data: {
                ...result.thread,
                replies: Array.isArray(result.thread.replies)
                    ? result.thread.replies.map((r) => ({
                          ...r,
                          threadId: undefined,
                      }))
                    : result.thread.replies,
            },
        })
    }
)

export { router as threadHandler }
