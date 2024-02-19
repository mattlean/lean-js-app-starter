import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { isObjectIdOrHexString } from 'mongoose'

import { MAX_THREADS } from '../../common/constants'
import { ServerError, isPrismaKnownRequestError } from '../common/error'
import { prisma } from '../common/prisma'

/** express-validator validation chain for comments. */
export const commentValidationChain = () =>
    body('comment').isString().trim().isLength({ min: 1, max: 2000 })

/** express-validator validation chain for threads. */
export const threadValidationChain = () => [
    body('subject')
        .isString()
        .trim()
        .isLength({ max: 191 })
        .optional({ values: 'null' }),
    commentValidationChain(),
]

/**
 * Express middleware that handles reply creation.
 */
export const createReplyMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Confirm that the thread exists
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

    // Create the reply
    try {
        res.locals.replyData = await prisma.reply.create({
            data: {
                comment: req.body.comment,
                threadId: req.params.threadId,
            },
            include: {
                thread: {
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
                },
            },
        })
    } catch (err) {
        return next(err)
    }

    return next()
}

/**
 * Express middleware that handles thread creation and thread deletion
 * when max threads are reached.
 */
export const createThreadMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Create the new thread
    try {
        res.locals.threadData = await prisma.thread.create({
            data: {
                subject: req.body.subject,
                comment: req.body.comment,
            },
        })
    } catch (err) {
        return next(err)
    }

    // Count the amount of threads
    let countResult
    try {
        countResult = await prisma.thread.aggregate({ _count: true })
    } catch (err) {
        return next(err)
    }

    // Delete the least active thread if there are more than the max number of threads
    if (countResult._count > MAX_THREADS) {
        let leastActiveThreadResult
        try {
            // Query the Thread collection to find the thread with the oldest bump time
            leastActiveThreadResult = await prisma.thread.aggregateRaw({
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
            !Array.isArray(leastActiveThreadResult) ||
            leastActiveThreadResult.length !== 1 ||
            !leastActiveThreadResult[0]
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
                where: { id: leastActiveThreadResult[0].id },
            })
        } catch (err) {
            return next(err)
        }
    }

    return next()
}

/**
 * Express middleware that validates the thread ID route parameter is an ObjectId.
 */
export const validateThreadObjectIdMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!isObjectIdOrHexString(req.params.threadId)) {
        return next(
            new ServerError(
                404,
                'Thread was not found.',
                'Route parameter is not a valid ObjectId.'
            )
        )
    }

    return next()
}
