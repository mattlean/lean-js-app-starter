import { buildStore } from '../common/redux'

export const store = buildStore(window.__PRELOADED_STATE__)

delete window.__PRELOADED_STATE__

export type Store = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
