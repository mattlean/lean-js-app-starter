export interface Props {
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>
}

export default function Editor({ input, setInput }: Props) {
    return (
        <form className="flex w-full flex-col">
            <h1 className="border-r border-gray-500 px-3 py-1">Editor</h1>
            <textarea
                className="form-textarea h-full resize-none border-b-0 border-l-0 border-gray-500 bg-gray-900 font-mono text-xs focus:border-gray-500 focus:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    )
}
