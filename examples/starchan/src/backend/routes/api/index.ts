import { Router } from 'express'

import { apiErrorHandler, createNotFoundErrorHandler } from '../../core/error'
import { v1Handler } from './v1'

const router = Router()

router.use('/v1', v1Handler)

router.all('*', createNotFoundErrorHandler(true))

router.use(apiErrorHandler)

export { router as apiHandler }
