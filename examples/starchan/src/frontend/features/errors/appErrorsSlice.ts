import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ErrorPageData } from '../../../backend/common/error/errorPageData'

export type AppErrorsState = ErrorPageData[]

const initialState: AppErrorsState = []

/**
 * The appErrors slice is intended for app-level errors
 * that interrupt the regular user experience with an
 * error page that overrides the regular page content.
 */
export const appErrorsSlice = createSlice({
    name: 'appErrors',
    initialState,
    reducers: {
        setAppErrors: (_, action: PayloadAction<AppErrorsState>) =>
            action.payload,
    },
})

export const { setAppErrors } = appErrorsSlice.actions

export const appErrorsReducer = appErrorsSlice.reducer
