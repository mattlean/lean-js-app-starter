import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ErrorPageData } from '../../../backend/common/error/errorPageData'

export type ErrorsState = ErrorPageData[]

const initialState: ErrorsState = []

export const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setErrors: (_, action: PayloadAction<ErrorsState>) => action.payload,
    },
})

export const { setErrors } = errorsSlice.actions

export const errorsReducer = errorsSlice.reducer
