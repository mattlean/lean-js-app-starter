import bcrypt from 'bcrypt'

export { prismaMock } from '../../../prisma/singleton'

/**
 * Generate implementation for protectMiddleware that mocks authorization.
 * @param reqUser User token data to set to req.user
 * @return Function that generates protectMiddleware function implementation
 */
export const genProtectMiddlewareAuthImpl =
    (reqUser: DecodedJWT) => (req, res, next) => {
        req.user = reqUser
        return next()
    }

/**
 * Restore original implementation for protectMiddleware.
 * @return protectMiddleware function implementation
 */
export const restoreProtectMiddlewareImpl = (req, res, next) => {
    const { protectMiddleware } = jest.requireActual('../../core/auth')
    return protectMiddleware(req, res, next)
}

/**
 * Produce hash from plain text password synchronously.
 * @param password Plain text password to be encrypted
 * @return The encrypted data salt
 */
export const hashPasswordSync = (password: string) =>
    bcrypt.hashSync(password, 5)
