import { Route, createRoutesFromElements } from 'react-router-dom'

import Shell from '../features/Shell'
import ThreadList from '../features/threads/ThreadList'
import ThreadPage from '../features/threads/ThreadPage'

export const jsxRoutes = (
    <Route path="/" element={<Shell />}>
        <Route path="/" element={<ThreadList />}>
            <Route path="/:page" element={<ThreadList />} />
        </Route>
        <Route path="thread/:threadId" element={<ThreadPage />} />
    </Route>
)

export const objRoutes = createRoutesFromElements(jsxRoutes)
