import { StrictMode } from 'react'
import { Routes } from 'react-router-dom'

import { jsxRoutes } from './routes'

export default function App() {
    return (
        <StrictMode>
            <Routes>{jsxRoutes}</Routes>
        </StrictMode>
    )
}
