import { useContext } from 'react'

import ErrorMessageContext from '../ErrorMessageContext'

export interface Props {
    refPreview: React.RefObject<HTMLElement>
}

export default function TopBar({ refPreview }: Props) {
    const [, setErrorMessage] = useContext(ErrorMessageContext)

    return (
        <nav className="w-full space-x-1 border-b border-gray-500 px-3 py-2">
            <button
                className="btn"
                onClick={() => window.api.showOpenFileDialog()}
            >
                Open File
            </button>
            <button
                className="btn"
                onClick={() => {
                    if (refPreview.current) {
                        window.api.showExportHtmlDialog(
                            refPreview.current.innerHTML,
                        )
                    } else {
                        setErrorMessage(
                            'ERROR: Preview element could not be found.',
                        )
                    }
                }}
            >
                Export as HTML
            </button>
        </nav>
    )
}
