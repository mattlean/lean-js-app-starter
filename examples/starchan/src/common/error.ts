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
        case 500:
            return 'Internal server error'
        default:
            return 'An error occurred'
    }
}
