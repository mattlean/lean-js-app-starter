import { useEffect } from 'react'

export interface Props {
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>
}

export default function Editor({ input, setInput }: Props) {
    useEffect(() => {
        const removeReadFileListener = window.api.onReadFile((content) => {
            if (content) {
                setInput(content)
            }
        })

        return () => {
            removeReadFileListener()
        }
    }, [setInput])

    return (
        <form className="flex w-full flex-1 flex-col">
            <h1 className="border-r border-gray-500 px-3 py-1">Editor</h1>
            <textarea
                value={input}
                autoFocus
                className="form-textarea flex-1 resize-none border-b-0 border-l-0 border-gray-500 bg-gray-900 font-mono text-xs focus:border-gray-500 focus:ring-0"
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    )
}
