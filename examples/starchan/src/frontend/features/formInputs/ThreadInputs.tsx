import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setComment, setSubject } from "./formInputsSlice";

export interface Props {
  isLoading?: boolean;
}

export default function ThreadInputs({ isLoading }: Props) {
  const subject = useAppSelector((state) => state.formInputs.subject);
  const comment = useAppSelector((state) => state.formInputs.comment);
  const formError = useAppSelector((state) => state.formError);

  const dispatch = useAppDispatch();

  return (
    <table className="post-form__table">
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
              onChange={(e) => dispatch(setSubject(e.target.value))}
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
              onChange={(e) => dispatch(setComment(e.target.value))}
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
  );
}
