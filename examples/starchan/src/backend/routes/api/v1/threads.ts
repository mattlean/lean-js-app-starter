import { Router } from 'express'

const router = Router()

// Create a new thread
router.post('/', (req, res) => res.json({ data: {} }))

// Read a thread
router.get('/:uuid', (req, res) => res.json({ data: [] }))

// List threads
router.get('/', (req, res) => res.json({ data: [] }))

// Create a new reply in a thread
router.post('/:uuid/reply', (req, res) => res.json({ data: {} }))

export { router as threadHandler }
