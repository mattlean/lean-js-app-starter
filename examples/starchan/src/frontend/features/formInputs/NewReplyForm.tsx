import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isAPIErrorRes, isFetchBaseQueryError } from "../../common/error";
import { useCreateReplyMutation } from "../api/apiSlice";
import { setAppErrors } from "../errors/appErrorsSlice";
import { clearFormError, genFormError } from "../errors/formErrorSlice";
import ReplyInputs from "./ReplyInputs";
import { clearForm } from "./formInputsSlice";

export default function NewReplyForm() {
  const comment = useAppSelector((state) => state.formInputs.comment);
  const [show, setShow] = useState(false);

  const { threadId } = useParams();
  const [createReply, { isLoading }] = useCreateReplyMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let content;

  if (!show) {
    content = (
      <>
        <span className="post-form__txt">
          [
          <button className="post-form__btn" onClick={() => setShow(true)}>
            Post a Reply
          </button>
          ]
        </span>
        <noscript>
          <form action={`/thread/${threadId}`} method="post">
            <ReplyInputs />
          </form>
        </noscript>
      </>
    );
  } else {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(clearFormError());

      let res;
      try {
        res = await createReply({
          threadId,
          comment,
        }).unwrap();
      } catch (err) {
        if (isFetchBaseQueryError(err) && isAPIErrorRes(err.data)) {
          if (err.status === 400 && err.data?.errors) {
            return dispatch(genFormError(err.data.errors, err));
          }
        }

        return dispatch(
          setAppErrors(
            [
              {
                heading: "Network Error",
                content: "An error was encountered while creating the reply.",
              },
            ],
            err instanceof Error || isFetchBaseQueryError(err)
              ? err
              : undefined,
          ),
        );
      }

      if (!res?.data) {
        return dispatch(
          setAppErrors([
            {
              heading: "Data Read Error",
              content: "Reply data could not be read.",
            },
          ]),
        );
      }

      setShow(false);
      dispatch(clearForm());

      const newReplyId = res.data.replies[res.data.replies.length - 1]?.id;
      if (newReplyId) {
        navigate(`#${newReplyId}`);
      }
    };

    content = (
      <form onSubmit={handleSubmit}>
        <ReplyInputs isLoading={isLoading} />
      </form>
    );
  }

  return <section className="post-form">{content}</section>;
}
