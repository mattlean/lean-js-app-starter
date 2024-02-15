import { Route, createRoutesFromElements } from 'react-router-dom'

import Shell from '../features/Shell'
import Fail from '../features/errors/Fail'
import ThreadList from '../features/threads/ThreadList'
import ThreadPage from '../features/threads/ThreadPage'

export const jsxRoutes = (
    <Route path="/" element={<Shell />}>
        <Route path="/" element={<ThreadList />}>
            <Route path="/:page" element={<ThreadList />} />
        </Route>
        <Route path="thread/:threadId" element={<ThreadPage />} />
        {process.env.NODE_ENV !== 'production' && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Route path="fail" element={<Fail />} />
        )}
    </Route>
)

export const objRoutes = createRoutesFromElements(jsxRoutes)
