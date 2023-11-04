export const { createJWT, hashPassword, verifyPassword, verifyToken } =
    jest.requireActual('../auth')

export const protectMiddleware = jest.fn()
