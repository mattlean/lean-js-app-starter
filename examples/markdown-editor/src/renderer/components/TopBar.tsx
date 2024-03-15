import { Dispatch, RefObject, SetStateAction, useContext } from 'react'

import ErrorMessageContext from '../ErrorMessageContext'
import LightModeBtn from './LightModeBtn'

export interface Props {
    filePath?: string
    hasChanges: boolean
    input: string
    refPreview: RefObject<HTMLElement>
    setHasChanges: Dispatch<SetStateAction<boolean>>
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
        <nav className="flex w-full justify-between border-b border-zinc-300 px-3 py-2 dark:border-gray-700">
            <section className="space-x-2">
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
                            setErrorMessage(
                                'Preview element could not be found.',
                            )
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
            </section>
            <section>
                <LightModeBtn />
            </section>
        </nav>
    )
}
