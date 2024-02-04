import { ChangeEventHandler } from 'react'

import { useAppSelector } from '../../app/hooks'

export interface Props {
    comment?: string
    isLoading?: boolean
    subject?: string
    onCommentChange?: ChangeEventHandler<HTMLTextAreaElement>
    onSubjectChange?: ChangeEventHandler<HTMLInputElement>
}

export default function ThreadInputs({
    comment,
    isLoading,
    subject,
    onCommentChange,
    onSubjectChange,
}: Props) {
    const formError = useAppSelector((state) => state.formError)

    return (
        <table className="post-form__table">
            <tbody>
                <tr>
                    <th>
                        <label htmlFor="subject">Subject</label>
                    </th>
                    <td>
                        <input
                            name="subject"
                            type="text"
                            value={subject}
                            onChange={onSubjectChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="comment">Comment</label>
                    </th>
                    <td>
                        <textarea
                            name="comment"
                            value={comment}
                            onChange={onCommentChange}
                        />
                    </td>
                </tr>
                {formError && (
                    <tr>
                        <td colSpan={2} className="post-form__err-msg">
                            {formError}
                        </td>
                    </tr>
                )}
                <tr>
                    <td colSpan={2} className="post-form__post-cell">
                        <button type="submit" disabled={isLoading}>
                            Post
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
