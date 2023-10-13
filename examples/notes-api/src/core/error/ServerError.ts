import { ValidationError } from 'express-validator'

/** Data for a user-facing error page. */
export interface ErrorPage {
    heading?: string
    content?: string
}

/** User-facing errors stored on the ServerError.  */
export type ServerErrorErrors = (string | ErrorPage | ValidationError)[]

/** Developer errors stored on the ServerError. */
export type ServerErrorDevErrors = (string | Error | ValidationError)[]

/**
 * Generate default error message depending on the passed HTTP response status code.
 * @param statusCode HTTP response status code
 * @return Default error message
 */
export const genDefaultErrorMessage = (statusCode: number) => {
    switch (statusCode) {
        case 400:
            return 'Bad request'
        case 401:
            return 'Unauthorized'
        case 404:
            return 'Not found'
        case 409:
            return 'Conflict'
        case 500:
            return 'Internal server error'
        default:
            return 'An error occurred'
    }
}

/** Type predicate for ErrorPage. */
export const isErrorPage = (
    err: string | ErrorPage | ValidationError
): err is ErrorPage => {
    if (typeof err === 'object') {
        return (
            (err as ErrorPage).heading !== undefined ||
            (err as ErrorPage).content !== undefined
        )
    }
    return false
}

/** Type predicate for ServerError. */
export const isServerError = (err: ServerError | Error): err is ServerError =>
    err instanceof ServerError

/**
 * Custom error specialized in handling server errors.
 * It can accumulate multiple JavaScript Errors and express-validator ValidationErrors
 * and organize which errors are displayed to users and which others are logged for developers.
 */
export default class ServerError extends Error {
    /** HTTP response status code. */
    statusCode: number

    /** User-facing error messages.  */
    errors?: ServerErrorErrors

    /** Errors intended for developers for debugging purposes. */
    devErrors?: ServerErrorDevErrors

    constructor(
        statusCode = 500,
        inputErrs?: string | ErrorPage | ValidationError | ServerErrorErrors,
        inputDevErrs?: string | Error | ValidationError | ServerErrorDevErrors
    ) {
        super()
        this.name = 'ServerError'
        this.statusCode = statusCode

        if (Array.isArray(inputDevErrs)) {
            this.devErrors = inputDevErrs
        } else if (inputDevErrs) {
            this.devErrors = [inputDevErrs]

            if (typeof inputDevErrs === 'string') {
                this.devErrors = [new Error(inputDevErrs)]
                this.message = inputDevErrs
            } else if (inputDevErrs instanceof Error) {
                this.devErrors = [inputDevErrs]
                this.message = inputDevErrs.message
            } else if (
                inputDevErrs.type === 'alternative' ||
                inputDevErrs.type === 'alternative_grouped' ||
                inputDevErrs.type === 'unknown_fields' ||
                inputDevErrs.type === 'field'
            ) {
                // Handle case where one ValidationError is encountered
                this.devErrors = [inputDevErrs]
                this.message = inputDevErrs.msg
            }
        }

        if (Array.isArray(inputErrs)) {
            this.errors = inputErrs
        } else if (inputErrs) {
            this.errors = [inputErrs]
        }

        const defaultErrorMessage = genDefaultErrorMessage(statusCode)
        if (!this.message) {
            this.message = defaultErrorMessage
        }

        if (!this.errors) {
            this.errors = [defaultErrorMessage]
        }
    }
}
