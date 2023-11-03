import { Route } from 'react-router-dom'

import Shell from '../features/Shell'
import ErrorMessage from '../features/errors/ErrorMessage'
import ErrorMessageContextual from '../features/errors/ErrorMessageContextual'
import ThreadList from '../features/threads/ThreadList'
import ThreadPage from '../features/threads/ThreadPage'

export const routes = (
    <Route path="/" element={<Shell />} errorElement={<ErrorMessage />}>
        <Route
            path="/"
            element={<ThreadList />}
            errorElement={<ErrorMessageContextual />}
        >
            <Route
                path="/:page"
                element={<ThreadList />}
                errorElement={<ErrorMessageContextual />}
            />
        </Route>
        <Route
            path="thread/:threadId"
            element={<ThreadPage />}
            errorElement={<ErrorMessageContextual />}
        />
    </Route>
)
