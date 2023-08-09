import { Router } from 'express'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import HelloWorld from '../../frontend/components/HelloWorld'

const router = Router()

const FooComponent = renderToString(
    <StrictMode>
        <HelloWorld />
    </StrictMode>
)

router.get('/', (req, res) =>
    res.render('index', {
        title: 'ljas-starchan',
        content: FooComponent,
    })
)

export { router as pageHandler }
