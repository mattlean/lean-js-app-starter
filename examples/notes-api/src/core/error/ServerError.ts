import { ValidationError } from 'express-validator'

/** String that determines the type of ServerError. */
export type ServerErrorType =
    | 'auth'
    | 'conflict'
    | 'misc'
    | 'notFound'
    | 'validation'

/** Data for a user-facing error page. */
export interface ErrorPage {
    heading?: string
    content?: string
}

/** User-facing errors stored on the ServerError.  */
export type ServerErrorErrors = (string | ErrorPage | ValidationError)[]

/** Developer errors stored on the ServerError. */
export type ServerErrorDevErrors = (string | Error | ValidationError)[]

/** Type guard for ErrorPage. */
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

/** Type guard for ServerError. */
export const isServerError = (err: ServerError | Error): err is ServerError =>
    err instanceof ServerError

/**
 * Custom error specialized in handling server errors.
 * It can accumulate multiple JavaScript Errors and express-validator ValidationErrors
 * and organize which errors are displayed to users and which others are logged for developers.
 */
export default class ServerError extends Error {
    /** Type of ServerError. */
    type: ServerErrorType

    /** User-facing error messages.  */
    errors?: ServerErrorErrors

    /** Errors intended for developers for debugging purposes. */
    devErrors?: ServerErrorDevErrors

    constructor(
        type: ServerErrorType = 'misc',
        inputErrs?: string | ErrorPage | ValidationError | ServerErrorErrors,
        inputDevErrs?: string | Error | ValidationError | ServerErrorDevErrors
    ) {
        super()
        this.name = 'ServerError'
        this.type = type

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

        if (this.type === 'auth') {
            if (!this.message) {
                this.message = 'Unauthorized'
            }

            if (!this.errors) {
                this.errors = ['Unauthorized']
            }
        } else if (this.type === 'notFound') {
            if (!this.message) {
                this.message = 'Not found'
            }

            if (!this.errors) {
                this.errors = ['Not found']
            }
        } else if (this.type === 'validation') {
            if (!this.message) {
                this.message = 'Invalid input'
            }

            if (!this.errors) {
                this.errors = ['Invalid input']
            }
        } else {
            if (!this.message) {
                this.message = 'Internal server error'
            }

            if (!this.errors) {
                this.errors = ['Internal server error']
            }
        }
    }
}
