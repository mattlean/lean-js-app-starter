import { Router } from 'express'

import { apiErrorHandler, createNotFoundErrorHandler } from '../../core/error'
import { v1Handler } from './v1'

const router = Router()

router.use('/v1', v1Handler)

// Handle unknown paths with a not found error handler
router.all('*', createNotFoundErrorHandler(true))

// Catch all uncaught errors with an API error handler
router.use(apiErrorHandler)

export { router as apiHandler }
