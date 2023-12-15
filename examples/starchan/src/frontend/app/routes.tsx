import { useEffect, useState } from 'react'
import { Route, createRoutesFromElements } from 'react-router-dom'

import Shell from '../features/Shell'
import ThreadList from '../features/threads/ThreadList'
import ThreadPage from '../features/threads/ThreadPage'

function Ping() {
    const [poopRes, setPoopRes] = useState<string | undefined>('Loading...')
    useEffect(() => {
        fetch('http://localhost:3000/poop')
            .then((res) => {
                console.log('poop res', res)
                if (res.ok) {
                    return res.text()
                }
            })
            .then((result) => {
                console.log('poop result', result, typeof result)
                setPoopRes(result)
            })
            .catch((err) => {
                console.log('an err occurred')
                console.error(err)
            })
    }, [])

    return (
        <div>
            <p>im ping</p>
            <p>{poopRes}</p>
        </div>
    )
}

export const jsxRoutes = (
    <Route path="/" element={<Shell />}>
        <Route path="/" element={<ThreadList />}>
            <Route path="/:page" element={<ThreadList />} />
        </Route>
        <Route path="thread/:threadId" element={<ThreadPage />} />
        <Route path="ping" element={<Ping />}></Route>
    </Route>
)

export const objRoutes = createRoutesFromElements(jsxRoutes)
