import { configureStore } from '@reduxjs/toolkit'

import {
    apiMiddleware,
    apiReducer,
    apiReducerPath,
} from '../features/api/apiSlice'
import { appErrorsReducer } from '../features/errors/appErrorsSlice'
import { formErrorReducer } from '../features/errors/formErrorSlice'

/**
 * Build the Redux store with preconfigured options.
 * @param preloadedState
 * @return A new Redux store
 */
export const buildStore = (
    preloadedState?: any // eslint-disable-line @typescript-eslint/no-explicit-any
) =>
    configureStore({
        reducer: {
            [apiReducerPath]: apiReducer,
            appErrors: appErrorsReducer,
            formError: formErrorReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiMiddleware),
        preloadedState,
    })
