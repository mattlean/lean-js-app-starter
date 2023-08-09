import { Router } from 'express'

import { v1Handler } from './v1'

const router = Router()

router.use('/v1', v1Handler)

export { router as apiHandler }
