import { FormEvent, useEffect, useState } from 'react'
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

    useEffect(() => {
        // Clear possible existing form errors when this first mounts
        dispatch(clearFormError())
    }, [])

    if (!show) {
        return (
            <>
                <span className="center">
                    [
                    <button onClick={() => setShow(true)}>
                        Start a New Thread
                    </button>
                    ]
                </span>
                <noscript>
                    <form action="/" method="post" className="center">
                        <ThreadInputs />
                    </form>
                </noscript>
            </>
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
            console.error(
                'An error was encountered while creating the thread:',
                err
            )

            if (isFetchBaseQueryError(err) && isAPIErrorRes(err.data)) {
                if (err.status === 400 && err.data.errors) {
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
        <form className="center" onSubmit={handleSubmit}>
            <ThreadInputs
                comment={comment}
                isLoading={isLoading}
                subject={subject}
                onCommentChange={(e) => setComment(e.target.value)}
                onSubjectChange={(e) => setSubject(e.target.value)}
            />
        </form>
    )
}
