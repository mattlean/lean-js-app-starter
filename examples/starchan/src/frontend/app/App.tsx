import { PropsWithChildren, StrictMode } from 'react'
import { Routes } from 'react-router-dom'

import { jsxRoutes } from './routes'

export default function App({ children }: PropsWithChildren) {
    return (
        <StrictMode>
            {/* <Routes>{jsxRoutes}</Routes> */}
            {children}
        </StrictMode>
    )
}
