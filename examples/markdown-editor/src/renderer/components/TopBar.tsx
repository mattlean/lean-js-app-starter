import { useContext } from 'react'

import ErrorMessageContext from '../ErrorMessageContext'

export interface Props {
    filePath?: string
    hasChanges: boolean
    input: string
    refPreview: React.RefObject<HTMLElement>
    setHasChanges: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TopBar({
    filePath,
    hasChanges,
    input,
    refPreview,
    setHasChanges,
}: Props) {
    const [, setErrorMessage] = useContext(ErrorMessageContext)

    return (
        <nav className="w-full space-x-2 border-b border-gray-500 px-3 py-2">
            <button
                className="btn"
                onClick={() => window.api.showOpenFileDialog()}
            >
                Open File
            </button>
            <button
                disabled={!hasChanges}
                className="btn"
                onClick={() => {
                    window.api.saveFile(input)
                    setHasChanges(false)
                }}
            >
                Save File
            </button>
            <button
                className="btn"
                onClick={() => {
                    if (refPreview.current) {
                        window.api.showExportHtmlDialog(
                            refPreview.current.innerHTML,
                        )
                    } else {
                        setErrorMessage('Preview element could not be found.')
                    }
                }}
            >
                Export as HTML
            </button>
            <button
                disabled={!filePath}
                className="btn"
                onClick={() => {
                    window.api.showInFolder()
                }}
            >
                Show In Folder
            </button>
        </nav>
    )
}
