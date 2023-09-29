import { useState } from 'react'

export default function HelloWorld() {
    const [foo, setFoo] = useState(123)

    return (
        <div>
            Hello World {foo}
            <button onClick={() => setFoo(() => foo + 1)}>update foo</button>
        </div>
    )
}
