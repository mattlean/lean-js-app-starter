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
                <div className="flex h-screen w-screen flex-col bg-gray-950 text-white subpixel-antialiased">
                    <TopBar
                        refPreview={refPreview}
                        filePath={filePath}
                        hasChanges={hasChanges}
                        input={input}
                        setHasChanges={setHasChanges}
                    />
                    <div className="flex flex-1 flex-row overflow-hidden">
                        <Editor
                            input={input}
                            setFilePath={setFilePath}
                            setHasChanges={setHasChanges}
                            setInput={setInput}
                        />
                        <Preview input={input} refPreview={refPreview} />
                    </div>
                    <ErrorMessage />
                </div>
            </ErrorMessageContext.Provider>
        </ErrorBoundary>
    )
}
