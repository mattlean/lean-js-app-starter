import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

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

/**
 * Modified setAppErrors action creator that logs errors to the console.
 */
export const setAppErrors = (
    appErrs: AppErrorsState,
    err?: Error | FetchBaseQueryError,
) => {
    if (process.env.NODE_ENV !== 'test' && err) {
        // Hide error messages to prevent clogging of test output
        console.error(err)
    }

    return appErrorsSlice.actions.setAppErrors(appErrs)
}

export const appErrorsReducer = appErrorsSlice.reducer
