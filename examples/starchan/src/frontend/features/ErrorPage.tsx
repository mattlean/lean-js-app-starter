import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const err = useRouteError()
    console.error(err)

    let content
    if (isRouteErrorResponse(err)) {
        content = <i>{err.data}</i>
    }

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{content}</p>
            <Link to="/">Return to the home page</Link>
        </div>
    )
}
