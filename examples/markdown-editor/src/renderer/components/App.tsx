import { useState } from 'react'

import Editor from './Editor'
import Preview from './Preview'

export default function App() {
    const [input, setInput] = useState('')

    return (
        <div className="flex h-screen w-screen bg-gray-900 text-white">
            <Editor input={input} setInput={setInput} />
            <Preview input={input} />
        </div>
    )
}
