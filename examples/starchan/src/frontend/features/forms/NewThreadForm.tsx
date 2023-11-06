import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    isAPIErrorRes,
    isErrorWithMessage,
    isFetchBaseQueryError,
    isFieldValidationError,
} from '../../common/util'
import { useCreateThreadMutation } from '../api/apiSlice'
import ThreadInputs from './ThreadInputs'

export default function NewThreadForm() {
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [createThread, { error, isLoading }] = useCreateThreadMutation()
    const navigate = useNavigate()

    if (error) {
        throw new Error(
            'An error occurred when attempting to create a new thread.'
        )
    }

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
                    <form
                        action="/api/v1/threads"
                        method="post"
                        className="center"
                    >
                        <ThreadInputs />
                    </form>
                </noscript>
            </>
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrMsg('')

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
                if (err.data.errors) {
                    if (typeof err.data.errors[0] === 'string') {
                        setErrMsg(err.data.errors[0])
                    } else if (isFieldValidationError(err.data.errors[0])) {
                        setErrMsg(
                            `${err.data.errors[0].path} has ${err.data.errors[0].msg}`
                        )
                    }
                }
            } else if (isErrorWithMessage(err)) {
                setErrMsg(err.message)
            }
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
                errMsg={errMsg}
                isLoading={isLoading}
                subject={subject}
                onCommentChange={(e) => setComment(e.target.value)}
                onSubjectChange={(e) => setSubject(e.target.value)}
            />
        </form>
    )
}
