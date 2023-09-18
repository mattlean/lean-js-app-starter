import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.send('Notes API is live at: /api/v1'))

if (process.env.NODE_ENV !== 'production') {
    router.get('/fail', () => {
        throw new Error()
    })
}

export { router as frontendHandler }