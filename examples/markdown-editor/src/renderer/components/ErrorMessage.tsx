import { useContext, useEffect } from 'react'

import ErrorMessageContext from '../ErrorMessageContext'

export default function ErrorMessage() {
    const [errorMessage, setErrorMessage] = useContext(ErrorMessageContext)

    useEffect(() => {
        const removeMainErrorMessageListener = window.api.onMainErrorMessage(
            (mainErrorMessage) => {
                setErrorMessage(mainErrorMessage)
            },
        )

        return () => {
            removeMainErrorMessageListener()
        }
    }, [setErrorMessage])

    if (errorMessage) {
        return (
            <div className="flex items-center justify-between bg-red-600 px-3 py-2 text-sm">
                {errorMessage}{' '}
                <button onClick={() => setErrorMessage('')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        )
    }

    return null
}
