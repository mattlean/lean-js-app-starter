import { Dispatch, SetStateAction, useEffect } from 'react'

export interface Props {
    input: string
    isFocusMode: boolean
    setFilePath: Dispatch<SetStateAction<string | undefined>>
    setHasChanges: Dispatch<SetStateAction<boolean>>
    setInput: Dispatch<SetStateAction<string>>
}

export default function Editor({
    input,
    isFocusMode,
    setFilePath,
    setHasChanges,
    setInput,
}: Props) {
    useEffect(() => {
        const removeReadFileListener = window.api.onReadFile(
            (filePath, markdown) => {
                if (filePath) {
                    setFilePath(filePath)
                }

                if (markdown) {
                    setInput(markdown)
                }
            },
        )

        return () => {
            removeReadFileListener()
        }
    }, [setFilePath, setInput])

    return (
        <form className="flex w-1/2 flex-1 flex-col border-r border-zinc-300 dark:border-gray-700">
            {!isFocusMode && (
                <h1 className="border-b border-zinc-300 px-3 py-1 dark:border-gray-700">
                    Editor
                </h1>
            )}
            <textarea
                value={input}
                autoFocus
                className="form-textarea flex-1 resize-none border-none bg-white font-mono text-xs text-black focus:ring-0 dark:bg-gray-900 dark:text-white "
                onChange={async (e) => {
                    setInput(e.target.value)

                    const hasChanges = await window.api.checkForMarkdownChange(
                        e.target.value,
                    )
                    setHasChanges(hasChanges)
                }}
            />
        </form>
    )
}
