import { Thread } from '@prisma/client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ThreadsReduxState {
    threads: Thread[]
}

const initialState: ThreadsReduxState = { threads: [] }

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        addThread(state, action: PayloadAction<Thread>) {
            state.threads.push(action.payload)
        },
    },
})

export const { addThread } = threadsSlice.actions

export const threadsReducer = threadsSlice.reducer
