import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../app/hooks'
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
    }, [location?.pathname])
    return (
        <>
            <header>
                <h1 id="title">*chan</h1>
            </header>
            <hr />
            <Outlet />
            <footer className="footer">
                <p>
                    *chan (pronounced as starchan) is a{' '}
                    <a href="https://en.wikipedia.org/wiki/Textboard">
                        textboard
                    </a>{' '}
                    that demonstrates one of{' '}
                    <a href="#">
                        Lean JS App Starter&#39;s full-stack project setups
                    </a>
                    . It showcases an Express server that acts as a REST API and
                    a React server-side renderer. These work in tandem with a
                    React frontend.
                </p>
                <nav>
                    <ul className="footer__links">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">*chan GitHub</a>
                        </li>
                        <li>
                            <a href="https://github.com/mattlean/lean-js-app-starter">
                                Lean JavaScript Application Starter
                            </a>
                        </li>
                    </ul>
                </nav>
            </footer>
        </>
    )
}
