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
        setLocalCreatedAt(
            moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')
        )
    }, [data?.createdAt])

    return (
        <li className="reply">
            <div>
                <header>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <b className="name">Anonymous</b> //{' '}
                    <time dateTime={serverCreatedAt.toISOString()}>
                        {localCreatedAt || serverCreatedAt.toUTCString()}
                    </time>
                    {' Id.'}
                    {data.id}
                </header>
                <pre className="comment">{data.comment}</pre>
            </div>
        </li>
    )
}
