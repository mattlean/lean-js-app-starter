import { Reply as ReplyType } from '@prisma/client'
import moment from 'moment'

export interface Props {
    data: ReplyType
}

export default function Reply({ data }: Props) {
    return (
        <li className="reply">
            <div>
                <header>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <b className="name">Anonymous</b> //{' '}
                    {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')}
                    {' Id.'}
                    {data.id}
                </header>
                <pre className="comment">{data.comment}</pre>
            </div>
        </li>
    )
}
