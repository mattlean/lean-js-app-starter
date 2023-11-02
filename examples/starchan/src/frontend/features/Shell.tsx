import { Outlet } from 'react-router-dom'

export default function Shell() {
    return (
        <>
            <h1 className="center">*chan</h1>
            <Outlet />
        </>
    )
}
