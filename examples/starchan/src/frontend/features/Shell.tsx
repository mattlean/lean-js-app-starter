import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearFormError } from './errors/formErrorSlice'

export default function Shell() {
    const location = useLocation()
    const dispatch = useAppDispatch()

    const formError = useAppSelector((state) => state.formError)

    useEffect(() => {
        // Clear possible existing form errors when navigation occurs
        if (formError) {
            dispatch(clearFormError())
        }
    }, [location?.pathname])
    return (
        <>
            <header>
                <h1 className="title">*chan</h1>
            </header>
            <hr />
            <Outlet />
        </>
    )
}
