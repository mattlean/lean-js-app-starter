import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { setThreadPageTitle } from '../../../common/docTitle'
import { isFetchBaseQueryError } from '../../common/error'
import { APIError } from '../../common/error'
import Loading from '../Loading'
import { useGetThreadQuery } from '../api/apiSlice'
import NewReplyForm from '../formInputs/NewReplyForm'
import Thread from './Thread'
import ThreadPageNav from './ThreadPageNav'

export default function ThreadPage() {
    const { threadId } = useParams()
    const { hash } = useLocation()

    const { data: res, error, isLoading } = useGetThreadQuery(threadId)

    useEffect(() => {
        const jumpToTargetId = hash?.slice(1)

        if (res && res.data && res.data.id === jumpToTargetId) {
            const jumpToTarget = document.getElementById(jumpToTargetId)
            if (jumpToTarget) {
                jumpToTarget.scrollIntoView()
            }
        }
    }, [isLoading, hash]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        document.title = setThreadPageTitle(res)
    }, [res])

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        if (isFetchBaseQueryError(error) && error.status === 404) {
            throw new APIError(404, 'Thread was not found.')
        }

        throw new Error(
            'An error occurred when attempting to download the thread.'
        )
    }

    if (!res?.data) {
        throw new Error('Thread data could not be read.')
    }

    return (
        <>
            <main>
                <NewReplyForm />
                <hr />
                <ThreadPageNav />
                <Thread data={res.data} />
                <ThreadPageNav isBottom />
            </main>
        </>
    )
}
