import { Dispatch, useEffect } from "react";

import { ErrorMessageActions } from "../errorMessageReducer";

export interface Props {
  errorMessage: string;
  errorMessageDispatch: Dispatch<ErrorMessageActions>;
}

/**
 * React component that displays error messages at the bottom of the window
 * when necessary.
 */
export default function ErrorMessage({
  errorMessage,
  errorMessageDispatch,
}: Props) {
  useEffect(() => {
    const removeMainErrorMessageListener = window.api.onMainErrorMessage(
      (mainErrorMessage) => {
        errorMessageDispatch({ type: "set", payload: mainErrorMessage });
      },
    );

    return () => {
      removeMainErrorMessageListener();
    };
  }, [errorMessageDispatch]);

  if (errorMessage) {
    return (
      <div className="flex items-center justify-between bg-red-600 px-3 py-2 text-sm">
        {errorMessage}{" "}
        <button onClick={() => errorMessageDispatch({ type: "reset" })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  return null;
}
