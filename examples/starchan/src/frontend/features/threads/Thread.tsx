import { Thread as ThreadType } from '@prisma/client'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { useGetThreadsQuery } from '../api/apiSlice'

interface Props {
    data: ThreadType
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

        let replyLink
        if (!threadId)
            replyLink = (
                <>
                    {' '}
                    [<Link to={`/thread/${data.id}`}>Reply</Link>]
                </>
            )

        return (
            <li className="thread">
                <header>
                    {subject}
                    <b className="name">Anonymous</b>{' '}
                    {/* {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')} */}
                    10/1/23
                    {` Id.${data.id}`}
                    {replyLink}
                </header>
                <pre className="comment">{data.comment}</pre>
                {/* {replies} */}
            </li>
        )
    }

    return <div>nothing</div>
}
