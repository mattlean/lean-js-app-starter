import { Router } from 'express'

const router = Router()

router.get('/', (req, res) =>
    res.send(
        'Notes API is live at: /api/v1<br><br>Learn about the tech stack used for this project and more at its <a href="https://github.com/mattlean/lean-js-app-starter/tree/master/examples/notes-api">GitHub repo</a>.<br>This was built with <a href="https://github.com/mattlean/lean-js-app-starter">Lean JS App Starter</a>.',
    ),
)

if (process.env.NODE_ENV !== 'production') {
    // Responds with a 500 error to test API error handling.
    // This is only available in non-production modes.
    router.get('/fail', () => {
        throw new Error()
    })
}

export { router as frontendHandler }
