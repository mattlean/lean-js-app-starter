import { useParams } from 'react-router-dom'

import Loading from '../Loading'
import Nav from '../Nav'
import { useGetThreadQuery } from '../api/apiSlice'
import Thread from './Thread'

export default function ThreadPage() {
    const { threadId } = useParams()

    const { data: res, isLoading } = useGetThreadQuery(threadId)

    const content = isLoading ? <Loading /> : <Thread data={res.data} />

    if (isLoading) {
        return
    }

    return (
        <>
            <Nav />
            {content}
            <Nav isBottom />
        </>
    )
}
