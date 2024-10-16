import { useEffect, useReducer, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { exitTypes } from '../../common/types'
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
        const removeWindowCloseStartListener = window.api.onWindowCloseStart(
            () => {
                if (hasChanges) {
                    window.api.showUnsavedChangesDialog('closeWin')
                } else {
                    window.api.closeWindowEnd()
                }
            },
        )

        return () => {
            removeWindowCloseStartListener()
        }
    }, [hasChanges])

    useEffect(() => {
        const removeAppQuitStartListener = window.api.onAppQuitStart(() => {
            if (hasChanges) {
                window.api.showUnsavedChangesDialog('quitApp')
            } else {
                window.api.quitAppFinish()
            }
        })

        return () => {
            removeAppQuitStartListener()
        }
    }, [hasChanges])

    useEffect(() => {
        const removeMainMdOpenDialogListener = window.api.onMainMdOpenDialog(
            () => window.api.showFileOpenDialog(markdown),
        )

        return () => {
            removeMainMdOpenDialogListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeMainMdOpenRecentListener = window.api.onMainMdOpenRecent(
            (recentFilePath) =>
                window.api.openRecentFile(recentFilePath, markdown),
        )

        return () => {
            removeMainMdOpenRecentListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeMainMdSaveListener = window.api.onMainMdSave(
            (exitType?: exitTypes) => window.api.saveFile(markdown, exitType),
        )

        return () => {
            removeMainMdSaveListener()
        }
    }, [markdown])

    useEffect(() => {
        const removeMdSaveSuccessListener = window.api.onMdSaveSuccess(() =>
            setHasChanges(false),
        )

        return () => {
            removeMdSaveSuccessListener()
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
