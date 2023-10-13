import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { FieldValidationError } from 'express-validator'

import { APIErrorRes } from '../features/api/types'

/**
 * Type predicate to narrow an unknown error to an object with a string "message" property.
 * Taken from: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
 */
export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (error as any).message === 'string'
    )
}

/**
 * Type predicate to narrow an unknown error to FetchBaseQueryError.
 * Taken from: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
 */
export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

/** Type predicate for APIErrorRes. */
export function isAPIErrorRes(data: unknown): data is APIErrorRes {
    return Array.isArray((data as APIErrorRes).errors)
}

/** Type predicate for express-validator's FieldValidationError. */
export function isFieldValidationError(
    err: Object // eslint-disable-line @typescript-eslint/ban-types
): err is FieldValidationError {
    return (
        typeof (err as FieldValidationError).msg === 'string' &&
        typeof (err as FieldValidationError).path === 'string'
    )
}
