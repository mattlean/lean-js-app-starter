import { Outlet } from 'react-router-dom'

import NewThreadForm from './forms/NewThreadForm'

export default function Shell() {
    return (
        <>
            <header id="page-head">
                <h1 className="center">*chan</h1>
                <NewThreadForm />
                <hr />
            </header>
            <Outlet />
        </>
    )
}
