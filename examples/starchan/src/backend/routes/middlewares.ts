import { NextFunction, Request, Response } from 'express'
import { isObjectIdOrHexString } from 'mongoose'

import { ServerError } from '../common/error'

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
