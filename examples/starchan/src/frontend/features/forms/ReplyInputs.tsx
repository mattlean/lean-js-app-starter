import { ChangeEventHandler } from 'react'

import { useAppSelector } from '../../app/hooks'

export interface Props {
    comment?: string
    isLoading?: boolean
    onCommentChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export default function ReplyInputs({
    comment,
    isLoading,
    onCommentChange,
}: Props) {
    const formError = useAppSelector((state) => state.formError)

    return (
        <table className="post-form__table">
            <tbody>
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
                            <b>{formError}</b>
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
