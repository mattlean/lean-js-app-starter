import { StrictMode } from 'react'
import { Routes } from 'react-router-dom'

import { routes } from './routes'

export default function App() {
    return (
        <StrictMode>
            <Routes>{routes}</Routes>
        </StrictMode>
    )
}
