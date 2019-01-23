import { Router } from 'express'

import routeAPIThread from './thread'

const router = Router()

router.get('/', (req, res) => res.send('*chan API'))

router.use('/thread', routeAPIThread)

export default router
