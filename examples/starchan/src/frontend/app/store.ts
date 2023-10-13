import { configureStore } from '@reduxjs/toolkit'

import {
    apiMiddleware,
    apiReducer,
    apiReducerPath,
} from '../features/api/apiSlice'
import { threadsReducer } from '../features/threads/threadsSlice'

export const store = configureStore({
    reducer: {
        threads: threadsReducer,
        [apiReducerPath]: apiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispath = typeof store.dispatch
