import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import Footer from './Footer'
import { clearFormError } from './errors/formErrorSlice'
import { clearForm } from './formInputs/formInputsSlice'

export default function Shell() {
    const location = useLocation()
    const dispatch = useAppDispatch()

    const subject = useAppSelector((state) => state.formInputs.subject)
    const comment = useAppSelector((state) => state.formInputs.comment)
    const formError = useAppSelector((state) => state.formError)

    useEffect(() => {
        // Clear possible existing form state when navigation occurs
        if (subject || comment) {
            dispatch(clearForm())
        }

        if (formError) {
            dispatch(clearFormError())
        }
    }, [location?.pathname]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <header>
                <h1 id="title">*chan</h1>
            </header>
            <hr />
            <Outlet />
            <Footer />
        </>
    )
}
