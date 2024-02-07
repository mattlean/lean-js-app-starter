import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { isAPIErrorRes, isFetchBaseQueryError } from '../../common/error'
import { useCreateReplyMutation } from '../api/apiSlice'
import { clearFormError, genFormError } from '../errors/formErrorSlice'
import ReplyInputs from './ReplyInputs'
import { setComment } from './formInputsSlice'

export default function NewReplyForm() {
    const comment = useAppSelector((state) => state.formInputs.comment)
    const [show, setShow] = useState(false)

    const { threadId } = useParams()
    const [createReply, { isLoading }] = useCreateReplyMutation()
    const dispatch = useAppDispatch()

    let content

    if (!show) {
        content = (
            <>
                <span className="post-form__txt">
                    [
                    <button
                        className="post-form__btn"
                        onClick={() => setShow(true)}
                    >
                        Post a Reply
                    </button>
                    ]
                </span>
                <noscript>
                    <form action={`/thread/${threadId}`} method="post">
                        <ReplyInputs />
                    </form>
                </noscript>
            </>
        )
    } else {
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(clearFormError())

            let res
            try {
                res = await createReply({
                    threadId,
                    comment,
                }).unwrap()
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
            dispatch(setComment(''))
        }

        content = (
            <form onSubmit={handleSubmit}>
                <ReplyInputs isLoading={isLoading} />
            </form>
        )
    }

    return <section className="post-form">{content}</section>
}
