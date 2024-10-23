import { PropsWithChildren, StrictMode } from 'react'
import { Provider } from 'react-redux'

import ErrorHandler from '../features/errors/ErrorHandler'
import { Store } from './store'

export default function App({
    children,
    store,
}: PropsWithChildren<{ store: Store }>) {
    return (
        <StrictMode>
            <Provider store={store}>
                <ErrorHandler>{children}</ErrorHandler>
            </Provider>
        </StrictMode>
    )
}
