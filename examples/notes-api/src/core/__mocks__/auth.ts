export const { createJWT, hashPassword, verifyPassword, verifyToken } =
    jest.requireActual('../../core/auth')

export const protectMiddleware = jest.fn()
