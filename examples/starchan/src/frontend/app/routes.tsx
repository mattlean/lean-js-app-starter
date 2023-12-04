import { useEffect } from 'react'
import { Route, createRoutesFromElements } from 'react-router-dom'

import Shell from '../features/Shell'
import ThreadList from '../features/threads/ThreadList'
import ThreadPage from '../features/threads/ThreadPage'

function Ping() {
    useEffect(() => {
        fetch('/poop')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                console.log('an err occurred', res)
            })
            .then((result) => console.log(result))
            .catch((err) => {
                console.log('an err occurred')
                console.error(err)
            })
    }, [])

    return <div>im ping</div>
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
