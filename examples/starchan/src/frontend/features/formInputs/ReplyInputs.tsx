import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setComment } from './formInputsSlice'

export interface Props {
    isLoading?: boolean
}

export default function ReplyInputs({ isLoading }: Props) {
    const comment = useAppSelector((state) => state.formInputs.comment)
    const formError = useAppSelector((state) => state.formError)

    const dispatch = useAppDispatch()

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
                            onChange={(e) =>
                                dispatch(setComment(e.target.value))
                            }
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
