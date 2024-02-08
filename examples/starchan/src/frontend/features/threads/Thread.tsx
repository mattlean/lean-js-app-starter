import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { ThreadResData } from '../../common/types'
import Reply from './Reply'

export interface Props {
    data: ThreadResData
}

export default function Thread({ data }: Props) {
    const [createdAt, setCreatedAt] = useState<string>(() =>
        moment(data.createdAt).utc().format('MM/DD/YY(ddd)HH:mm:ss')
    )
    const { threadId } = useParams()

    const serverCreatedAt = useMemo(
        () => new Date(data.createdAt),
        [data?.createdAt]
    )

    useEffect(() => {
        // This will display the datetime in the server timezone on initial render so the hydration can match.
        // Afterwards, useEffect will run and convert the datetime to the user's local timezone.
        // This is not ideal UX, but it's ok for a small project like this one.
        setCreatedAt(moment(data.createdAt).format('MM/DD/YY(ddd)HH:mm:ss'))
    }, [data?.createdAt])

    if (!data) {
        return null
    }

    let subject
    if (data.subject) {
        subject = <strong>{data.subject} </strong>
    }

    const replies = data.replies?.map((reply) => (
        <Reply key={reply.id} data={reply} threadId={data.id} />
    ))

    let replyLink
    let omittedTxt
    if (!threadId) {
        replyLink = (
            <>
                {' '}
                [<Link to={`/thread/${data.id}`}>Reply</Link>]
            </>
        )

        if (data.replyCount && data.replyCount > 5) {
            const omittedCount = data.replyCount - data.replies.length
            omittedTxt = (
                <p className="omitted-txt">
                    {omittedCount} {omittedCount === 1 ? 'reply' : 'replies'}{' '}
                    omitted. <Link to={`/thread/${data.id}`}>Click here</Link>{' '}
                    to view.
                </p>
            )
        }
    }

    return (
        <>
            <section>
                <header id={data.id}>
                    {subject}
                    <span className="user">Anonymous</span>{' '}
                    <time dateTime={serverCreatedAt.toISOString()}>
                        {createdAt}
                    </time>{' '}
                    <Link
                        to={`/thread/${data.id}#${data.id}`}
                        className="jump-to-link"
                    >
                        Id.{data.id}
                    </Link>
                    {replyLink}
                </header>
                <pre>{data.comment}</pre>
                {omittedTxt}
            </section>
            {replies && replies?.length > 0 && (
                <ul className="reply-list">{replies}</ul>
            )}
        </>
    )
}
