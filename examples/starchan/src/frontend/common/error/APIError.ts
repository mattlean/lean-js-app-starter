import { genDefaultErrorMessage } from "../../../common/error";

/** Developer errors stored on the APIError. */
export type APIErrorDevErrors = (string | Error)[];

/** Type predicate for APIError. */
export const isAPIError = (err: APIError | Error): err is APIError =>
  err instanceof APIError;

/**
 * Custom error specialized in handling API errors on the client.
 */
export default class APIError extends Error {
  /** HTTP response status code. */
  statusCode: number;

  /** User-facing error messages. */
  errors?: string[];

  /** Errors intended for developers for debugging purposes. */
  devErrors?: APIErrorDevErrors;

  constructor(
    statusCode = 500,
    inputErrs?: string | string[],
    inputDevErrs?: string | Error | APIErrorDevErrors,
  ) {
    super();
    this.name = "APIError";
    this.statusCode = statusCode;

    if (Array.isArray(inputDevErrs)) {
      this.devErrors = inputDevErrs;
    } else if (inputDevErrs) {
      this.devErrors = [inputDevErrs];

      if (typeof inputDevErrs === "string") {
        // Encountered a string
        this.devErrors = [new Error(inputDevErrs)];
        this.message = inputDevErrs;
      } else if (inputDevErrs instanceof Error) {
        // Encountered an Error
        this.devErrors = [inputDevErrs];
        this.message = inputDevErrs.message;
      }
    }

    if (Array.isArray(inputErrs)) {
      this.errors = inputErrs;
    } else if (inputErrs) {
      this.errors = [inputErrs];
    }

    const defaultErrorMessage = genDefaultErrorMessage(statusCode);
    if (!this.message) {
      this.message = defaultErrorMessage;
    }

    if (!this.errors) {
      this.errors = [defaultErrorMessage];
    }
  }
}
