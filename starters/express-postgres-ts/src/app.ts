import compression from 'compression'
import express from 'express'
import helmet from 'helmet'

const app = express()

app.use(helmet()) // Middleware that enhances security by setting HTTP response headers

if (process.env.NODE_ENV === 'production') {
    app.use(compression()) // Middleware that compresses most response bodies
}

app.get('/', (req, res) => res.send('Hello World!'))

export default app
