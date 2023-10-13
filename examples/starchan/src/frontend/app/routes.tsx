import { Route } from 'react-router-dom'

import ErrorPage from '../features/ErrorPage'
import Shell from '../features/Shell'
import ThreadList from '../features/threads/ThreadList'
import ThreadPage from '../features/threads/ThreadPage'

export const routes = (
    <Route path="/" element={<Shell />} errorElement={<ErrorPage />}>
        <Route path="/" element={<ThreadList />} />
        <Route path="thread/:threadId" element={<ThreadPage />} />
    </Route>
)
