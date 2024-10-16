import { useState } from 'react'

const HelloComponent = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            Hello webpack
            <button onClick={() => setCount((c) => c + 1)}>+{count}</button>
        </div>
    )
}

export default HelloComponent
