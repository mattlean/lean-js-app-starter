import { useEffect, useReducer, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { INITIAL_STATE, errorMessageReducer } from '../errorMessageReducer'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import Preview from './Preview'
import TopBar from './TopBar'

export default function App() {
    const [hasChanges, setHasChanges] = useState(false)
    const [filePath, setFilePath] = useState<string | undefined>(undefined)
    const [isFocusMode, setIsFocusMode] = useState(false)
    const [input, setInput] = useState('')
    const [errorMessage, errorMessageDispatch] = useReducer(
        errorMessageReducer,
        INITIAL_STATE,
    )

    const refPreview = useRef<HTMLElement>(null)

    useEffect(() => {
        const mainSaveFileListener = window.api.onMainSaveFile(() =>
            window.api.saveFile(input),
        )

        return () => {
            mainSaveFileListener()
        }
    }, [input])

    useEffect(() => {
        const saveFileSuccessListener = window.api.onSaveFileSuccess(() =>
            setHasChanges(false),
        )

        return () => {
            saveFileSuccessListener()
        }
    }, [])

    useEffect(() => {
        const mainHtmlExportDialogListener = window.api.onMainHtmlExportDialog(
            () => {
                if (refPreview.current) {
                    window.api.showExportHtmlDialog(
                        refPreview.current.innerHTML,
                    )
                }
            },
        )

        return () => {
            mainHtmlExportDialogListener()
        }
    }, [input])

    useEffect(() => {
        const focusModeToggleListener = window.api.onFocusModeToggle(() =>
            setIsFocusMode((s) => !s),
        )

        return () => {
            focusModeToggleListener()
        }
    }, [setFilePath, setInput])

    return (
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
            <main className="flex h-screen w-screen flex-col bg-zinc-200 text-zinc-500 subpixel-antialiased dark:bg-gray-950 dark:text-white">
                {!isFocusMode && (
                    <TopBar
                        errorMessageDispatch={errorMessageDispatch}
                        filePath={filePath}
                        hasChanges={hasChanges}
                        input={input}
                        refPreview={refPreview}
                        setIsFocusMode={setIsFocusMode}
                    />
                )}
                <section className="flex flex-1 flex-row overflow-hidden">
                    <Editor
                        input={input}
                        isFocusMode={isFocusMode}
                        setFilePath={setFilePath}
                        setHasChanges={setHasChanges}
                        setInput={setInput}
                    />
                    <Preview
                        input={input}
                        isFocusMode={isFocusMode}
                        refPreview={refPreview}
                    />
                </section>
                <ErrorMessage
                    errorMessage={errorMessage}
                    errorMessageDispatch={errorMessageDispatch}
                />
            </main>
        </ErrorBoundary>
    )
}
