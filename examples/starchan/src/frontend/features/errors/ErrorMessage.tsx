import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { isErrorWithMessage } from '../../common/util'

export interface Props {
    content?: string
    error?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ErrorPage() {
    const err = useRouteError()
    console.error(err)

    let content
    if (isRouteErrorResponse(err)) {
        content = err.data
    } else if (isErrorWithMessage(err)) {
        content = err.message
    }

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            {content ?? (
                <p>
                    <i>{content}</i>
                </p>
            )}
            <p>
                <Link to="/">Return to the home page.</Link>
            </p>
        </div>
    )
}
