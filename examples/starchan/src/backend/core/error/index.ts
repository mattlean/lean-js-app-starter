import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import ServerError from './ServerError'
import {
    apiErrorHandler,
    createNotFoundErrorHandler,
    globalErrorHandler,
} from './errorHandlers'

export {
    apiErrorHandler,
    globalErrorHandler,
    createNotFoundErrorHandler,
    ServerError,
}

/** Type guard for Prisma errors. */
export const isPrismaKnownRequestError = (
    err: Prisma.PrismaClientKnownRequestError | Error
): err is Prisma.PrismaClientKnownRequestError =>
    err instanceof Prisma.PrismaClientKnownRequestError

/** Handle validation errors encountered by express-validator.*/
export const validateErrorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ServerError('validation', errors.array())
    }

    return next()
}