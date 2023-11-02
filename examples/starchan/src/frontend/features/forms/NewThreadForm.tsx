import { FormEvent, useState } from 'react'

import {
    isAPIErrorRes,
    isErrorWithMessage,
    isFetchBaseQueryError,
    isFieldValidationError,
} from '../../common/util'
import { useCreateThreadMutation } from '../api/apiSlice'

export default function NewThreadForm() {
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [createThread, { error, isLoading }] = useCreateThreadMutation()

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
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            setShow(true)
                        }}
                    >
                        Start a New Thread
                    </a>
                    ]
                </span>
                {/* <noscript> // TODO: readd this if complete SSR gets working
                    <form
                        id="new-form"
                        action="/api/thread"
                        method="post"
                        className="center"
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <label htmlFor="subject">Subject</label>
                                    </th>
                                    <td>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="comment">Comment</label>
                                    </th>
                                    <td>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <button type="submit">Post</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </noscript> */}
            </>
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrMsg('')

        try {
            await createThread({
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

        setShow(false)
        setSubject('')
        setComment('')
    }

    return (
        <form id="new-form" className="center" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <label htmlFor="subject">Subject</label>
                        </th>
                        <td>
                            <input
                                id="subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="comment">Comment</label>
                        </th>
                        <td>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    {errMsg && (
                        <tr>
                            <td colSpan={2} className="err-msg">
                                {errMsg}
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={2}>
                            <button type="submit" disabled={isLoading}>
                                Post
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}
