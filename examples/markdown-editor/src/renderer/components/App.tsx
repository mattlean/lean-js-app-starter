import { useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorMessageContext from '../ErrorMessageContext'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import Preview from './Preview'
import TopBar from './TopBar'

export default function App() {
    const [input, setInput] = useState('')
    const [hasChanges, setHasChanges] = useState(false)
    const [filePath, setFilePath] = useState<string | undefined>(undefined)
    const refPreview = useRef<HTMLElement>(null)
    const errorMessageReactState = useState('')

    return (
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
            <ErrorMessageContext.Provider value={errorMessageReactState}>
                <main className="flex h-screen w-screen flex-col bg-zinc-200 text-zinc-500 subpixel-antialiased dark:bg-gray-950 dark:text-white">
                    <TopBar
                        refPreview={refPreview}
                        filePath={filePath}
                        hasChanges={hasChanges}
                        input={input}
                        setHasChanges={setHasChanges}
                    />
                    <section className="flex flex-1 flex-row overflow-hidden">
                        <Editor
                            input={input}
                            setFilePath={setFilePath}
                            setHasChanges={setHasChanges}
                            setInput={setInput}
                        />
                        <Preview input={input} refPreview={refPreview} />
                    </section>
                    <ErrorMessage />
                </main>
            </ErrorMessageContext.Provider>
        </ErrorBoundary>
    )
}
