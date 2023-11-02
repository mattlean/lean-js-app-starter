import { useParams } from 'react-router-dom'

import { isFetchBaseQueryError } from '../../common/util'
import Loading from '../Loading'
import Nav from '../Nav'
import { useGetThreadQuery } from '../api/apiSlice'
import NewReplyForm from '../forms/NewReplyForm'
import Thread from './Thread'

export default function ThreadPage() {
    const { threadId } = useParams()

    const { data: res, error, isLoading } = useGetThreadQuery(threadId)

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        if (isFetchBaseQueryError(error) && error.status === 404) {
            throw new Error('Thread was not found.')
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
            <NewReplyForm />
            <hr />
            <Nav />
            <Thread data={res.data} />
            <Nav isBottom />
        </>
    )
}
