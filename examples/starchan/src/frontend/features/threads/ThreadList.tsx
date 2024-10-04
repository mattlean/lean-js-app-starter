import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { setThreadListPageTitle } from '../../../common/docTitle'
import Loading from '../Loading'
import PageSelect from '../PageSelect'
import { useGetThreadsQuery } from '../api/apiSlice'
import NewThreadForm from '../formInputs/NewThreadForm'
import Thread from './Thread'

export default function ThreadList() {
    const { page } = useParams()
    const [showForm, setShowForm] = useState(false)

    const currPage = page ? parseInt(page) : 1

    if (page !== undefined && (currPage === 1 || Number.isNaN(currPage))) {
        throw new Error(`Error: No route matches URL "/${page}"`)
    }

    const {
        data: res,
        error,
        isFetching,
        isLoading,
    } = useGetThreadsQuery(currPage)

    useEffect(() => {
        document.title = setThreadListPageTitle(currPage)
    }, [currPage])

    if (isLoading || isFetching) {
        return <Loading />
    }

    if (error) {
        throw new Error(
            'An error occurred when attempting to download the thread list.',
        )
    }

    if (!res?.data) {
        throw new Error('Thread list data could not be read.')
    }

    const content =
        res.data.length > 0 ? (
            <ul className="thread-list" data-testid="thread-list">
                {res.data.map((thread, i) => (
                    <li key={thread.id}>
                        <Thread data={thread} />
                        {res.data && i < res.data.length - 1 && <hr />}
                    </li>
                ))}
            </ul>
        ) : (
            <p>
                Currently no threads exist. Why don&#39;t you create the first
                one?
            </p>
        )

    return (
        <>
            <main>
                <NewThreadForm setShowForm={setShowForm} showForm={showForm} />
                <hr />
                {content}
            </main>
            <PageSelect totalPages={res?.info?.totalPages} />
        </>
    )
}
