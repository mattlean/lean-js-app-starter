import { Fragment } from 'react'

import Loading from '../Loading'
import { useGetThreadsQuery } from '../api/apiSlice'
import NewThreadForm from '../forms/NewThreadForm'
import Thread from './Thread'

export default function ThreadList() {
    const { data: res, error, isLoading } = useGetThreadsQuery()

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        throw new Error(
            'An error occurred when attempting to download the thread list.'
        )
    }

    if (!res?.data) {
        throw new Error('Thread list data could not be read.')
    }

    return (
        <>
            <NewThreadForm />
            <hr />
            <ul id="threads">
                {res.data.map((thread, i) => (
                    <Fragment key={thread.id}>
                        <Thread data={thread} />
                        {res.data && i < res.data.length - 1 && <hr />}
                    </Fragment>
                ))}
            </ul>
        </>
    )
}
