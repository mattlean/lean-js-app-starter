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
    const [markdown, setMarkdown] = useState('')
    const [errorMessage, errorMessageDispatch] = useReducer(
        errorMessageReducer,
        INITIAL_STATE,
    )

    const refPreview = useRef<HTMLElement>(null)

    useEffect(() => {
        window.onbeforeunload = (e) => {
            const hasChangesMain = window.api.checkForUnsavedChanges(markdown)

            if (hasChangesMain) {
                const result = window.api.showUnsavedChangesDialog()

                if (result.response === 0) {
                    window.api.saveFile(markdown, true)
                    e.returnValue = 'Saved unsaved changes dialog.'
                } else if (result.response === 2) {
                    e.returnValue = 'Cancelled unsaved changes dialog.'
                }
            }
        }

        return () => {
            window.onbeforeunload = null
        }
    }, [hasChanges, markdown])

    useEffect(() => {
        const removeMainMarkdownOpenDialogListener =
            window.api.onMainMarkdownOpenDialog(() =>
                window.api.showFileOpenDialog(markdown),
            )

        return () => {
            removeMainMarkdownOpenDialogListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeMainMarkdownOpenRecentListener =
            window.api.onMainMarkdownOpenRecent((recentFilePath) =>
                window.api.openRecentFile(recentFilePath, markdown),
            )

        return () => {
            removeMainMarkdownOpenRecentListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeMainSaveFileListener = window.api.onMainSaveFile(() =>
            window.api.saveFile(markdown),
        )

        return () => {
            removeMainSaveFileListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeSaveFileSuccessListener = window.api.onSaveFileSuccess(() =>
            setHasChanges(false),
        )

        return () => {
            removeSaveFileSuccessListener()
        }
    }, [])

    useEffect(() => {
        const removeMainHtmlExportDialogListener =
            window.api.onMainHtmlExportDialog(() => {
                if (refPreview.current) {
                    window.api.showHtmlExportDialog(
                        refPreview.current.innerHTML,
                    )
                }
            })

        return () => {
            removeMainHtmlExportDialogListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeFocusModeToggleListener = window.api.onFocusModeToggle(() =>
            setIsFocusMode((s) => !s),
        )

        return () => {
            removeFocusModeToggleListener()
        }
    }, [setFilePath, setMarkdown])

    return (
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
            <main className="flex h-screen w-screen flex-col bg-zinc-200 text-zinc-500 subpixel-antialiased dark:bg-gray-950 dark:text-white">
                {!isFocusMode && (
                    <TopBar
                        errorMessageDispatch={errorMessageDispatch}
                        filePath={filePath}
                        hasChanges={hasChanges}
                        markdown={markdown}
                        refPreview={refPreview}
                        setIsFocusMode={setIsFocusMode}
                    />
                )}
                <section className="flex flex-1 flex-row overflow-hidden">
                    <Editor
                        isFocusMode={isFocusMode}
                        markdown={markdown}
                        setFilePath={setFilePath}
                        setHasChanges={setHasChanges}
                        setMarkdown={setMarkdown}
                    />
                    <Preview
                        isFocusMode={isFocusMode}
                        markdown={markdown}
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
