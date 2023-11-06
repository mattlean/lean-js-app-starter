import { ChangeEventHandler } from 'react'

export interface Props {
    comment?: string
    errMsg?: string
    isLoading?: boolean
    onCommentChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export default function ReplyInputs({
    comment,
    errMsg,
    isLoading,
    onCommentChange,
}: Props) {
    return (
        <table>
            <tbody>
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
                            required
                        />
                    </td>
                </tr>
                {errMsg && (
                    <tr>
                        <td colSpan={2}>
                            <b className="center">{errMsg}</b>
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
