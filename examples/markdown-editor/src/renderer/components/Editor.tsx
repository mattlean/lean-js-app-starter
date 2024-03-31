import { Dispatch, SetStateAction, useEffect } from 'react'

export interface Props {
    isFocusMode: boolean
    markdown: string
    setFilePath: Dispatch<SetStateAction<string | undefined>>
    setHasChanges: Dispatch<SetStateAction<boolean>>
    setMarkdown: Dispatch<SetStateAction<string>>
}

export default function Editor({
    isFocusMode,
    markdown,
    setFilePath,
    setHasChanges,
    setMarkdown,
}: Props) {
    useEffect(() => {
        const removeReadFileListener = window.api.onReadFile(
            (filePath, fileMarkdown) => {
                if (filePath) {
                    setFilePath(filePath)
                }

                if (fileMarkdown) {
                    setMarkdown(fileMarkdown)
                }
            },
        )

        return () => {
            removeReadFileListener()
        }
    }, [setFilePath, setMarkdown])

    return (
        <form className="flex w-1/2 flex-1 flex-col border-r border-zinc-300 dark:border-gray-700">
            {!isFocusMode && (
                <h1 className="border-b border-zinc-300 px-3 py-1 dark:border-gray-700">
                    Editor
                </h1>
            )}
            <textarea
                value={markdown}
                autoFocus
                className="form-textarea flex-1 resize-none border-none bg-white font-mono text-xs text-black focus:ring-0 dark:bg-gray-900 dark:text-white "
                onChange={async (e) => {
                    setMarkdown(e.target.value)

                    const hasChanges = await window.api.checkForMarkdownChange(
                        e.target.value,
                    )
                    setHasChanges(hasChanges)
                }}
            />
        </form>
    )
}
