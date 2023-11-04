import { query } from 'express-validator'

export const threadPageValidationChain = () =>
    query('page').isInt({ min: 1, max: 10 }).optional()
