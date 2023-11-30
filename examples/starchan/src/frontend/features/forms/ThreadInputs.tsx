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
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={onCommentChange}
                        />
                    </td>
                </tr>
                {formError && (
                    <tr>
                        <td colSpan={2} className="err-msg">
                            {formError}
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
    )
}