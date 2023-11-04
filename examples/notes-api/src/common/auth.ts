import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ServerError } from './error'

/**
 * Create JSON web token from a user.
 */
export const createJWT = (user: User) => {
    if (!process.env.JWT_SECRET) {
        throw new ServerError(500, undefined, 'JWT secret was not set')
    }

    return jwt.sign(
        { uuid: user.uuid, username: user.username },
        process.env.JWT_SECRET
    )
}

/**
 * Produce hash from plain text password.
 * @param password Plain text password to be encrypted
 * @return A promise to be either resolved with the encrypted data salt or rejected with an Error
 */
export const hashPassword = (password: string) => bcrypt.hash(password, 5)

/**
 * Verify plain text password against correct hashed password.
 * @param password Plain text password to be encrypted
 * @param hash Correct hashed password to be compared against
 * @return A promise to be either resolved with the comparison result salt or rejected with an Error
 */
export const verifyPassword = (password: string, hash: string) =>
    bcrypt.compare(password, hash)

/**
 * Verify JSON web token.
 * @param token JSON web token
 * @return Decoded JSON web token data
 */
export const verifyToken = (token: string): DecodedJWT => {
    if (!process.env.JWT_SECRET) {
        throw new ServerError(500, undefined, 'JWT secret was not set')
    }

    return jwt.verify(token, process.env.JWT_SECRET) as DecodedJWT
}

/**
 * Express middleware that protects a route by requiring a valid JSON web token.
 */
export const protectMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        throw new ServerError(401)
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        throw new ServerError(401, 'Invalid token')
    }

    let user
    try {
        user = verifyToken(token)
    } catch (err) {
        if (err instanceof Error) {
            throw new ServerError(401, 'Invalid token', err)
        }
        throw err
    }

    req.user = user
    return next()
}
