import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import { isAPIErrorRes, isFetchBaseQueryError } from '../../common/error'
import { useCreateReplyMutation } from '../api/apiSlice'
import { clearFormError, genFormError } from '../errors/formErrorSlice'
import ReplyInputs from './ReplyInputs'

export default function NewReplyForm() {
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)

    const { threadId } = useParams()
    const [createReply, { isLoading }] = useCreateReplyMutation()
    const dispatch = useAppDispatch()

    if (!show) {
        return (
            <section>
                [<button onClick={() => setShow(true)}>Post a Reply</button>]
                <noscript>
                    <form action={`/thread/${threadId}`} method="post">
                        <ReplyInputs />
                    </form>
                </noscript>
            </section>
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(clearFormError())

        let res
        try {
            res = await createReply({ threadId, comment }).unwrap()
        } catch (err) {
            if (isFetchBaseQueryError(err) && isAPIErrorRes(err.data)) {
                if (err.status === 400 && err.data.errors) {
                    console.error(
                        'An error was encountered while creating the reply:',
                        err
                    )

                    return dispatch(genFormError(err.data.errors))
                }
            }

            throw new Error(
                'An error was encountered while creating the reply.'
            )
        }

        if (!res?.data) {
            throw new Error('Reply data could not be read.')
        }

        setShow(false)
        setComment('')
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <ReplyInputs
                    comment={comment}
                    isLoading={isLoading}
                    onCommentChange={(e) => setComment(e.target.value)}
                />
            </form>
        </section>
    )
}
