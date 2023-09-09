import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    const [forceCountInput, setForceCountInput] = useState(20)

    return (
        <>
            <h1>Counter</h1>
            <p>The count is currently: {count}</p>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <label>
                Force count to be:
                <input
                    type="number"
                    value={forceCountInput}
                    onChange={(e) => {
                        setForceCountInput(e.target.valueAsNumber)
                    }}
                />
            </label>
            <button
                onClick={() => {
                    if (Number.isNaN(forceCountInput)) {
                        setCount(0)
                        setForceCountInput(0)
                    } else {
                        setCount(forceCountInput)
                    }
                }}
            >
                Force
            </button>
        </>
    )
}
