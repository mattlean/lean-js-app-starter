import { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

// import ErrorPage from '../features/ErrorPage'
import { store } from './store'

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Shell />,
//         errorElement: <ErrorPage />,
//     },
// ])

export default function App({ children }: PropsWithChildren) {
    return <ReduxProvider store={store}>{children}</ReduxProvider>
}
{
    /* <Provider store={store}> */
}
{
    /* <header id="page-head"> */
}
{
    /* <h1 className="center">*chan</h1> */
}
{
    /* <NewThreadForm /> */
}
{
    /* <hr /> */
}
{
    /* </header> */
}
{
    /* {content} */
}
{
    /* <Loading /> */
}
{
    /* <ThreadList /> */
}
{
    /* </Provider> */
}
