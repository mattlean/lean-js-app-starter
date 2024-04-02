import { Dispatch, RefObject, SetStateAction } from 'react'

import { ErrorMessageActions } from '../errorMessageReducer'
import ColorModeBtn from './ColorModeBtn'

export interface Props {
    errorMessageDispatch: Dispatch<ErrorMessageActions>
    filePath?: string
    hasChanges: boolean
    markdown: string
    refPreview: RefObject<HTMLElement>
    setIsFocusMode: Dispatch<SetStateAction<boolean>>
}

/**
 * React component that displays the top bar of the window that contains buttons
 * that give the user access to various features.
 */
export default function TopBar({
    errorMessageDispatch,
    filePath,
    hasChanges,
    markdown,
    refPreview,
    setIsFocusMode,
}: Props) {
    return (
        <nav className="flex w-full justify-between border-b border-zinc-300 px-3 py-2 dark:border-gray-700">
            <section className="space-x-2">
                <button
                    className="btn"
                    onClick={() => window.api.showFileOpenDialog(markdown)}
                >
                    Open File
                </button>
                <button
                    disabled={!hasChanges}
                    className="btn"
                    onClick={() => window.api.saveFile(markdown)}
                >
                    Save File
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        if (refPreview.current) {
                            window.api.showHtmlExportDialog(
                                refPreview.current.innerHTML,
                            )
                        } else {
                            errorMessageDispatch({
                                type: 'set',
                                payload: 'Preview element could not be found.',
                            })
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
            <section className="flex space-x-2">
                <button
                    className="btn flex space-x-2"
                    onClick={() => setIsFocusMode(true)}
                >
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
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <span>Focus Mode</span>
                </button>
                <ColorModeBtn />
            </section>
        </nav>
    )
}
