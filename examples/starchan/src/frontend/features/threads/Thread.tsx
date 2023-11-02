import moment from 'moment'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { ThreadWithReplies } from '../../common/types'
import Reply from './Reply'

// import { useGetThreadsQuery } from '../api/apiSlice'

export interface Props {
    data: ThreadWithReplies
}

export default function Thread({ data }: Props) {
    // const { thread } = useGetThreadsQuery(undefined, {
    //     selectFromResult: (result) => ({
    //         ...result,
    //         thread: result.data?.data?.find((t) => t.id === id),
    //     }),
    //     skip: true,
    // })
    const { threadId } = useParams()

    console.log('thread', data)

    if (data) {
        let subject
        if (data.subject) {
            subject = <strong>{data.subject} </strong>
        }

        // let repliesData = data.replies
        // if (
        //     !match.params.id &&
        //     Array.isArray(data.replies) &&
        //     data.replies.length > 5
        // ) {
        //     repliesData = data.replies.slice(data.replies.length - 5)
        // }

        // let replies
        // if (Array.isArray(repliesData) && repliesData.length > 0) {
        //     replies = repliesData.map((reply) => (
        //         <Reply key={reply._id} data={reply} />
        //     ))
        //     replies = <ul>{replies}</ul>
        // }

        const replies = data.replies?.map((reply) => (
            <Reply key={reply.id} data={reply} />
        ))

        let replyLink
        if (!threadId)
            replyLink = (
                <>
                    {' '}
                    [<Link to={`/thread/${data.id}`}>Reply</Link>]
                </>
            )

        return (
            <ul className="thread">
                <header>
                    {subject}
                    <b className="name">Anonymous</b>{' '}
                    {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')}
                    {` Id.${data.id}`}
                    {replyLink}
                </header>
                <pre className="comment">{data.comment}</pre>
                {replies && replies?.length > 0 && <ul>{replies}</ul>}
            </ul>
        )
    }

    return <div>nothing</div>
}
