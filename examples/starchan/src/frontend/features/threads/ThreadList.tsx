import { Fragment } from 'react'

import Loading from '../Loading'
import { useGetThreadsQuery } from '../api/apiSlice'
import Thread from './Thread'

// const THREADS_DUMMY_DATA: ThreadInterface[] = [
//     {
//         _id: 123,
//         subject: 'hello world',
//         comment: 'i am the comment',
//     },
//     {
//         _id: 124,
//         subject: 'hello world',
//         comment: 'i am the comment',
//     },
//     {
//         _id: 125,
//         subject: 'hello world',
//         comment: 'i am the comment',
//     },
// ]

export default function ThreadList() {
    const { data: res, isLoading } = useGetThreadsQuery()

    console.log('huh', res?.data, isLoading)
    const threads = res?.data ?? []

    if (isLoading) {
        return <Loading />
    }

    return (
        <ul id="threads">
            {threads.map((thread, i) => (
                <Fragment key={thread.id}>
                    <Thread data={thread} />
                    {threads.length - 1 === i ? undefined : <hr />}
                </Fragment>
            ))}
        </ul>
    )
}
