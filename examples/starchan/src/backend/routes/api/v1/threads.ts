import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response, Router } from 'express'
import { query } from 'express-validator'

import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../common/error'
import { ServerError } from '../../../common/error'
import { prisma } from '../../../common/prisma'
import { MAX_THREADS, PAGE_SIZE } from '../../constants'
import {
    commentValidationChain,
    createReplyMiddleware,
    createThreadMiddleware,
    threadValidationChain,
    validateThreadObjectIdMiddleware,
} from '../../middlewares'

const router = Router()

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
    createThreadMiddleware,
    (req: Request, res: Response) => {
        if (!res.locals.threadData) {
            throw new ServerError(500, 'Thread data could not be read.')
        }

        return res.status(201).json({ data: res.locals.threadData })
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
        let countResult
        let threadListData: [] | Prisma.JsonObject

        // If page query string parameter is encountered,
        // pagination results are expected so set the skipAmt so the correct page can be arrived at.
        // Otherwise set the skipAmt to 0 so all threads will be sent.
        if (
            typeof req.query.page === 'string' &&
            req.query.page.trim() !== ''
        ) {
            currPage = parseInt(req.query.page)
            skipAmt = currPage ? (currPage - 1) * PAGE_SIZE : 0
        } else {
            skipAmt = 0
        }

        // Count the amount of the threads
        try {
            countResult = await prisma.thread.aggregate({ _count: true })
        } catch (err) {
            return next(err)
        }

        if (countResult._count === 0) {
            // Because no threads exist, we can avoid an unnecessary DB query
            threadListData = []
        } else {
            try {
                // Query the Thread collection for the thread list data
                threadListData = await prisma.thread.aggregateRaw({
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
                                replyCount: { $size: '$replies' },
                            },
                        },

                        // Perform a projection and convert the id's ObjectId and datetimes to strings
                        // and include the replyCount
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
                                replyCount: 1,
                            },
                        },
                    ],
                })
            } catch (err) {
                return next(err)
            }
        }

        if (!Array.isArray(threadListData)) {
            return next(
                new ServerError(
                    500,
                    undefined,
                    'Encountered a problem reading the data from the thread list query.'
                )
            )
        }

        if (currPage) {
            const totalPages = Math.ceil(countResult._count / PAGE_SIZE)

            // Respond with paginated threads
            return res.json({
                data: threadListData,
                info: {
                    totalPages,
                    hasNextPage: currPage < totalPages,
                    hasPreviousPage: currPage > 1 && currPage <= totalPages + 1,
                },
            })
        }

        // Respond with all threads
        return res.json({
            data: threadListData,
            info: {
                threadCount: countResult._count,
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
    validateThreadObjectIdMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        let threadData
        try {
            threadData = await prisma.thread.findUniqueOrThrow({
                where: { id: req.params.threadId },
                include: {
                    replies: {
                        orderBy: { createdAt: 'asc' },
                        select: {
                            id: true,
                            comment: true,
                            createdAt: true,
                        },
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
                return next(new ServerError(404, 'Thread was not found.', err))
            }
            return next(err)
        }

        return res.json({ data: threadData })
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
    validateThreadObjectIdMiddleware,
    commentValidationChain(),
    validateErrorMiddleware,
    createReplyMiddleware,
    (req: Request, res: Response) => {
        if (!res.locals.replyData) {
            throw new ServerError(500, 'Reply data could not be read.')
        }

        return res.status(201).json({
            data: res.locals.replyData.thread,
        })
    }
)

export { router as threadHandler }
