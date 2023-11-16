import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ServerErrorErrors } from '../../../backend/common/error/ServerError'
import { isFieldValidationError } from '../../common/error'

export type FormErrorState = string

const initialState: FormErrorState = ''

/**
 * The formError slice is intended for form-level errors
 * that do not interrupt the user experience and allows
 * the user to continue to interact with the page normally.
 */
export const formErrorSlice = createSlice({
    name: 'formError',
    initialState,
    reducers: {
        clearFormError: () => initialState,
        genFormError: (_, action: PayloadAction<ServerErrorErrors>) => {
            if (action.payload.length < 1) {
                throw new Error('Encountered an empty array of errors.')
            }

            let formError = 'The following fields are invalid: '

            for (let i = 0; i < action.payload.length; ++i) {
                const currErr = action.payload[i]

                if (
                    isFieldValidationError(currErr) &&
                    currErr.msg === 'Invalid value'
                ) {
                    formError += currErr.path

                    if (i !== action.payload.length - 1) {
                        formError += ', '
                    }
                } else {
                    throw new Error(
                        'Expected to encounter a field validation error.'
                    )
                }
            }

            return formError
        },
    },
})

export const { clearFormError, genFormError } = formErrorSlice.actions

export const formErrorReducer = formErrorSlice.reducer
