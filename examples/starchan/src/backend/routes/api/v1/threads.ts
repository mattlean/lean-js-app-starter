import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response, Router } from 'express'
import { body, query } from 'express-validator'
import { isObjectIdOrHexString } from 'mongoose'

import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../core/error'
import { ServerError } from '../../../core/error'
import { prisma } from '../../../core/prisma'

const PAGE_SIZE = 20
const MAX_THREADS = 200

const router = Router()

const commentValidationChain = () =>
    body('comment').isString().trim().isLength({ min: 1, max: 2000 })

const threadValidationChain = () => [
    body('subject')
        .isString()
        .trim()
        .isLength({ min: 1, max: 191 })
        .optional({ values: 'null' }),
    commentValidationChain(),
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
        // Create the new thread
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

        // Count the amount of threads
        let threadCount
        try {
            threadCount = await prisma.thread.aggregate({ _count: true })
        } catch (err) {
            return next(err)
        }

        // Delete the least active thread if there are more than the max number of threads
        if (threadCount._count > MAX_THREADS) {
            let leastActiveThread
            try {
                // Query the Thread collection to find the thread with the oldest bump time
                leastActiveThread = await prisma.thread.aggregateRaw({
                    pipeline: [
                        // Lookup all replies related to the thread
                        {
                            $lookup: {
                                from: 'Reply',
                                localField: '_id',
                                foreignField: 'threadId',
                                as: 'replies',
                            },
                        },

                        // Get the latest reply createdAt and set that as the bumpTime.
                        // If there is no reply, used the thread's createdAt instead.
                        {
                            $addFields: {
                                bumpTime: {
                                    $cond: {
                                        if: { $size: '$replies' },
                                        then: { $last: '$replies.createdAt' },
                                        else: '$createdAt',
                                    },
                                },
                            },
                        },

                        // Sort by bumpTime in ascending order
                        { $sort: { bumpTime: 1 } },

                        // Because the aggregation is sorted in ascending order,
                        // the first document is the least active one
                        { $limit: 1 },

                        // Perform a projection and convert the ObjectId to a string
                        {
                            $project: {
                                _id: 0,
                                id: { $toString: '$_id' },
                            },
                        },
                    ],
                })
            } catch (err) {
                return next(err)
            }

            if (
                !Array.isArray(leastActiveThread) ||
                leastActiveThread.length !== 1 ||
                !leastActiveThread[0]
            ) {
                return next(
                    new ServerError(
                        500,
                        undefined,
                        'Encountered a problem reading the data from the least active thread query.'
                    )
                )
            }

            // Delete the least active thread
            try {
                await prisma.thread.delete({
                    where: { id: leastActiveThread[0].id },
                })
            } catch (err) {
                return next(err)
            }
        }

        return res.status(201).json({ data })
    }
)

/**
 * @openapi
 * /api/v1/threads:
 *   get:
 *     description: List threads. Each thread includes its 5 latest replies.
 */
router.get(
    '/',
    query('page').isInt({ min: 1, max: 10 }).optional(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        let currPage = null
        let skipAmt
        let threadCount
        let data: [] | Prisma.JsonObject

        // If page query string parameter is encountered,
        // pagination results are expected so set the skipAmt so the correct page can be arrived at.
        // Otherwise set the skipAmt to 0 so all threads will be sent.
        if (typeof req.query.page === 'string') {
            currPage = parseInt(req.query.page)
            skipAmt = currPage ? (currPage - 1) * PAGE_SIZE : 0
        } else {
            skipAmt = 0
        }

        // Count the amount of the threads
        try {
            threadCount = await prisma.thread.aggregate({ _count: true })
        } catch (err) {
            return next(err)
        }

        if (threadCount._count === 0) {
            // Because no threads exist, we can avoid an unnecessary DB query
            data = []
        } else {
            try {
                // Query the Thread collection for the thread list data
                data = await prisma.thread.aggregateRaw({
                    pipeline: [
                        // Lookup all replies related to the thread
                        {
                            $lookup: {
                                from: 'Reply',
                                localField: '_id',
                                foreignField: 'threadId',
                                as: 'replies',
                            },
                        },

                        // Get the latest reply createdAt and set that as the bumpTime.
                        // If there is no reply, used the thread's createdAt instead.
                        {
                            $addFields: {
                                bumpTime: {
                                    $cond: {
                                        if: { $size: '$replies' },
                                        then: { $last: '$replies.createdAt' },
                                        else: '$createdAt',
                                    },
                                },
                            },
                        },

                        // Sort by bumpTime in descending order so threads are arranged from most active to least
                        { $sort: { bumpTime: -1 } },

                        // Skip to the beginning of the current page
                        { $skip: skipAmt },

                        // Display a page size number of threads or all the threads
                        { $limit: currPage ? PAGE_SIZE : MAX_THREADS },

                        // Only display the 5 most recent replies in a thread
                        {
                            $project: {
                                subject: 1,
                                comment: 1,
                                createdAt: 1,
                                replies: {
                                    $slice: ['$replies', -5],
                                },
                            },
                        },

                        // Perform a projection and convert the id's ObjectId and datetimes to strings
                        {
                            $project: {
                                _id: 0,
                                id: { $toString: '$_id' },
                                subject: 1,
                                comment: 1,
                                createdAt: {
                                    $dateToString: { date: '$createdAt' },
                                },
                                replies: {
                                    $map: {
                                        input: '$replies',
                                        as: 'reply',
                                        in: {
                                            id: { $toString: '$$reply._id' },
                                            comment: '$$reply.comment',
                                            createdAt: {
                                                $dateToString: {
                                                    date: '$$reply.createdAt',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                })
            } catch (err) {
                return next(err)
            }
        }

        if (!Array.isArray(data)) {
            throw new ServerError(
                500,
                undefined,
                'Encountered a problem reading the data from the thread list query.'
            )
        }

        if (currPage) {
            const totalPages = Math.ceil(threadCount._count / PAGE_SIZE)

            // Respond with paginated threads
            return res.json({
                data,
                info: {
                    totalPages,
                    hasNextPage: currPage < totalPages,
                    hasPreviousPage: currPage > 1 && currPage <= totalPages + 1,
                },
            })
        }

        // Respond with all threads
        return res.json({
            data,
            info: {
                threadCount: threadCount._count,
            },
        })
    }
)

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
    commentValidationChain(),
    validateErrorMiddleware,
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
