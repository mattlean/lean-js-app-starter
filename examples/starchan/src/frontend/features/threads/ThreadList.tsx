import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../Loading'
import PageSelect from '../PageSelect'
import { useGetThreadsQuery } from '../api/apiSlice'
import NewThreadForm from '../forms/NewThreadForm'
import Thread from './Thread'

export default function ThreadList() {
    const { page } = useParams()

    const currPage = page ? parseInt(page) : 1

    if (page !== undefined && (currPage === 1 || Number.isNaN(currPage))) {
        throw new Error(`Error: No route matches URL "/${page}"`)
    }

    const { data: res, error, isLoading } = useGetThreadsQuery(currPage)

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

    const totalPages = res?.info?.totalPages || 1

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
            <PageSelect totalPages={totalPages} />
        </>
    )
}
