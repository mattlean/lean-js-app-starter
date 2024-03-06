import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import ServerError, { isServerError } from './ServerError'
import {
    apiErrorHandler,
    createNotFoundErrorHandler,
    globalErrorHandler,
} from './errorHandlers'
import { isErrorPageData } from './errorPageData'

export {
    apiErrorHandler,
    createNotFoundErrorHandler,
    globalErrorHandler,
    isErrorPageData,
    isServerError,
    ServerError,
}

/**
 * Generate default error message depending on the passed HTTP response status code.
 * @param statusCode HTTP response status code
 * @return Default error message
 */
export const genDefaultErrorMessage = (statusCode: number) => {
    switch (statusCode) {
        case 400:
            return 'Bad request'
        case 401:
            return 'Unauthorized'
        case 404:
            return 'Not found'
        case 409:
            return 'Conflict'
        case 500:
            return 'Internal server error'
        default:
            return 'An error occurred'
    }
}

/** Type predicate for Prisma errors. */
export const isPrismaKnownRequestError = (
    err: Prisma.PrismaClientKnownRequestError | Error,
): err is Prisma.PrismaClientKnownRequestError =>
    err instanceof Prisma.PrismaClientKnownRequestError

/**
 * Handle validation errors encountered by express-validator.
 */
export const validateErrorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ServerError(400, errors.array())
    }

    return next()
}
