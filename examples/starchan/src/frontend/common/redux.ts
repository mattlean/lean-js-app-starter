import { configureStore } from '@reduxjs/toolkit'

import {
    apiMiddleware,
    apiReducer,
    apiReducerPath,
} from '../features/api/apiSlice'

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
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiMiddleware),
        preloadedState,
    })
