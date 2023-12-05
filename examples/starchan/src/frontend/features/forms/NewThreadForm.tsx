import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import { isAPIErrorRes, isFetchBaseQueryError } from '../../common/error'
import { useCreateThreadMutation } from '../api/apiSlice'
import { clearFormError, genFormError } from '../errors/formErrorSlice'
import ThreadInputs from './ThreadInputs'

export default function NewThreadForm() {
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)

    const [createThread, { isLoading }] = useCreateThreadMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    if (!show) {
        return (
            <section>
                [
                <button onClick={() => setShow(true)}>
                    Start a New Thread
                </button>
                ]
                <noscript>
                    <form action="/" method="post">
                        <ThreadInputs />
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
            res = await createThread({
                subject: subject.trim() || undefined,
                comment: comment.trim(),
            }).unwrap()
        } catch (err) {
            if (isFetchBaseQueryError(err) && isAPIErrorRes(err.data)) {
                if (err.status === 400 && err.data.errors) {
                    console.error(
                        'An error was encountered while creating the thread:',
                        err
                    )

                    return dispatch(genFormError(err.data.errors))
                }
            }

            throw new Error(
                'An error was encountered while creating the thread.'
            )
        }

        if (!res?.data) {
            throw new Error('Thread data could not be read.')
        }

        navigate(`/thread/${res.data.id}`)
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <ThreadInputs
                    comment={comment}
                    isLoading={isLoading}
                    subject={subject}
                    onCommentChange={(e) => setComment(e.target.value)}
                    onSubjectChange={(e) => setSubject(e.target.value)}
                />
            </form>
        </section>
    )
}
