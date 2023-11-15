import { ValidationError } from 'express-validator'

/** Data for a user-facing error page. */
export interface ErrorPageData {
    heading?: string
    content?: string
}

/** Type predicate for ErrorPageData. */
export const isErrorPageData = (
    err: string | ErrorPageData | ValidationError
): err is ErrorPageData => {
    if (typeof err === 'object') {
        return (
            (err as ErrorPageData).heading !== undefined ||
            (err as ErrorPageData).content !== undefined
        )
    }
    return false
}
