import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { ReplyResData } from '../../common/types'

export interface Props {
    data: ReplyResData
    threadId: string
}

export default function Reply({ data, threadId }: Props) {
    const [createdAt, setCreatedAt] = useState<string>(() =>
        moment(data.createdAt).utc().format('MM/DD/YY(ddd)HH:mm:ss')
    )
    const [className, setClassName] = useState<string>('reply__content')

    const { hash } = useLocation()
    const { threadId: threadIdRouteParam } = useParams()

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

    useEffect(() => {
        if (threadIdRouteParam) {
            const jumpToTargetId = hash?.slice(1)

            // This will apply the active modifier on the reply content on mount.
            // This is done to avoid hydration mismatches.
            if (data.id === jumpToTargetId) {
                setClassName((s) => `${s} reply__content--active`)
            } else {
                setClassName(() => 'reply__content')
            }

            if (data.id === jumpToTargetId) {
                const jumpToTarget = document.getElementById(jumpToTargetId)
                if (jumpToTarget) {
                    jumpToTarget.scrollIntoView()
                }
            }
        }
    }, [hash]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <li id={data.id} className="reply">
            <span className="reply__marker">{'>>'}</span>
            <section className={className}>
                <header>
                    <span className="user">Anonymous</span>{' '}
                    <time dateTime={serverCreatedAt.toISOString()}>
                        {createdAt}
                    </time>{' '}
                    <Link
                        to={`/thread/${threadId}#${data.id}`}
                        className="jump-to-link"
                    >
                        Id.{data.id}
                    </Link>
                </header>
                <pre>{data.comment}</pre>
            </section>
        </li>
    )
}
