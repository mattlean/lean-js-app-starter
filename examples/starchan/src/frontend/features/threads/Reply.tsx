import { Reply as ReplyType } from '@prisma/client'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'

export interface Props {
    data: ReplyType
}

export default function Reply({ data }: Props) {
    const [localCreatedAt, setLocalCreatedAt] = useState<string>('')

    const serverCreatedAt = useMemo(
        () => new Date(data.createdAt),
        [data?.createdAt]
    )

    useEffect(() => {
        // Convert server-side UTC datetime to local time
        setLocalCreatedAt(
            moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')
        )
    }, [data?.createdAt])

    return (
        <li id={data.id} className="reply">
            <span className="reply__marker">{'>>'}</span>
            <section className="reply__content">
                <header>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <span className="user">Anonymous</span>{' '}
                    <time dateTime={serverCreatedAt.toISOString()}>
                        {/* This will display the datetime in the server timezone on initial render so the hydration can match. */}
                        {/* Afterwards, useEffect will run and convert the datetime to the user's local timezone. */}
                        {/* This is not ideal UX, but it's ok for a small project like this one. */}
                        {localCreatedAt || serverCreatedAt.toUTCString()}
                    </time>
                    {' Id.'}
                    {data.id}
                </header>
                <pre>{data.comment}</pre>
            </section>
        </li>
    )
}
