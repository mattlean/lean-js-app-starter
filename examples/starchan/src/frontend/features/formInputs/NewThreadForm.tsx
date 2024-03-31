import { Dispatch, FormEvent, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { isAPIErrorRes, isFetchBaseQueryError } from '../../common/error'
import { useCreateThreadMutation } from '../api/apiSlice'
import { clearFormError, genFormError } from '../errors/formErrorSlice'
import ThreadInputs from './ThreadInputs'

export interface Props {
    setShowForm: Dispatch<SetStateAction<boolean>>
    showForm: boolean
}

export default function NewThreadForm({ setShowForm, showForm }: Props) {
    const subject = useAppSelector((state) => state.formInputs.subject)
    const comment = useAppSelector((state) => state.formInputs.comment)

    const [createThread, { isLoading }] = useCreateThreadMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    let content

    if (!showForm) {
        content = (
            <>
                <span className="post-form__txt">
                    [
                    <button
                        className="post-form__btn"
                        onClick={() => setShowForm(true)}
                    >
                        Start a New Thread
                    </button>
                    ]
                </span>
                <noscript>
                    <form action="/" method="post">
                        <ThreadInputs />
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
                res = await createThread({
                    subject: subject || undefined,
                    comment,
                }).unwrap()
            } catch (err) {
                if (isFetchBaseQueryError(err) && isAPIErrorRes(err.data)) {
                    if (err.status === 400 && err.data.errors) {
                        if (process.env.NODE_ENV !== 'test') {
                            // Hide error messages to prevent clogging of test output
                            console.error(
                                'An error was encountered while creating the thread:',
                                err,
                            )
                        }

                        return dispatch(genFormError(err.data.errors))
                    }
                }

                throw new Error(
                    'An error was encountered while creating the thread.',
                )
            }

            if (!res?.data) {
                throw new Error('Thread data could not be read.')
            }

            navigate(`/thread/${res.data.id}`)
        }

        content = (
            <form onSubmit={handleSubmit}>
                <ThreadInputs isLoading={isLoading} />
            </form>
        )
    }

    return <section className="post-form">{content}</section>
}