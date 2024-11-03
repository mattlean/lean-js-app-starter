import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { genDefaultErrorMessage } from "../../../common/error";
import { useAppSelector } from "../../app/hooks";
import { isAPIError } from "../../common/error";
import ErrorPage from "./ErrorPage";

/**
 * Component that acts as an error boundary and a Redux app error handler.
 */
export default function ErrorHandler({ children }: PropsWithChildren) {
  const errors = useAppSelector((state) => state.appErrors);

  const content =
    errors && errors[0] && errors[0].heading ? (
      <ErrorPage heading={errors[0].heading} content={errors[0].content} />
    ) : (
      children
    );

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (process.env.NODE_ENV !== "test") {
          // Hide error messages to prevent clogging of test output
          console.error(error);
        }

        let heading;
        let content;

        if (isAPIError(error)) {
          heading = genDefaultErrorMessage(error.statusCode);

          if (error.errors && error.errors.length === 1 && error.errors[0]) {
            content = error.errors[0];
          }
        } else {
          heading = "Oops!";
          content = "Sorry, an unexpected error has occurred.";
        }

        return <ErrorPage heading={heading} content={content} />;
      }}
    >
      {content}
    </ErrorBoundary>
  );
}
