import { ValidationError } from 'express-validator'

import { genDefaultErrorMessage } from '../../../common/error'
import { ErrorPageData } from './errorPageData'

/** User-facing errors stored on the ServerError. */
export type ServerErrorErrors = (string | ErrorPageData | ValidationError)[]

/** Developer errors stored on the ServerError. */
export type ServerErrorDevErrors = (string | Error | ValidationError)[]

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
        inputErrs?:
            | string
            | ErrorPageData
            | ValidationError
            | ServerErrorErrors,
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
                // Encountered a string
                this.devErrors = [new Error(inputDevErrs)]
                this.message = inputDevErrs
            } else if (inputDevErrs instanceof Error) {
                // Encountered an Error
                this.devErrors = [inputDevErrs]
                this.message = inputDevErrs.message
            } else if (inputDevErrs.msg) {
                // Encountered an express-validator ValidationError
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
