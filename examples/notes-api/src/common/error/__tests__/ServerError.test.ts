import { ValidationError } from "express-validator";

import { ServerError, isErrorPageData, isServerError } from "..";

const FOO_TXT = "foo";
const BAR_TXT = "bar";

describe("ServerError", () => {
  it("no args has expected defaults", () => {
    const serverErr = new ServerError();

    expect(serverErr.name).toBe("ServerError");
    expect(serverErr.statusCode).toBe(500);
    expect(serverErr.message).toBe("Internal server error");
    expect(serverErr.devErrors).toBeUndefined();
    expect(serverErr.errors).toHaveLength(1);

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.errors[0]).toBe("Internal server error");
  });

  it("inputDevErrs defined as an array will be directly assigned to the instance", () => {
    const err1 = new Error();
    const err2 = new Error();
    const serverErr = new ServerError(undefined, undefined, [err1, err2]);

    expect(Array.isArray(serverErr.devErrors)).toBe(true);
    if (!Array.isArray(serverErr.devErrors)) {
      throw new Error("Expected devErrors for a ServerError to be an array.");
    }

    expect(serverErr.devErrors[0]).toBe(err1);
    expect(serverErr.devErrors[1]).toBe(err2);
    expect(serverErr.devErrors).toHaveLength(2);
  });

  it("inputDevErrs defined as a string will set it as the message and set it as an Error in devErrors", () => {
    const serverErr = new ServerError(undefined, undefined, FOO_TXT);

    expect(Array.isArray(serverErr.devErrors)).toBe(true);
    if (!Array.isArray(serverErr.devErrors)) {
      throw new Error("Expected devErrors for a ServerError to be an array.");
    }

    expect(serverErr.devErrors[0]).toBeInstanceOf(Error);
    if (!(serverErr.devErrors[0] instanceof Error)) {
      throw new Error(
        "Expected devErrors[0] for a ServerError to be an Error.",
      );
    }

    expect(serverErr.message).toBe(FOO_TXT);
    expect(serverErr.devErrors[0].message).toBe(FOO_TXT);
  });

  it("inputDevErrs defined as an Error will set the message as the ServerError message and set it as an Error in devErrors", () => {
    const err = new Error(FOO_TXT);
    const serverErr = new ServerError(undefined, undefined, err);

    expect(Array.isArray(serverErr.devErrors)).toBe(true);
    if (!Array.isArray(serverErr.devErrors)) {
      throw new Error("Expected devErrors for a ServerError to be an array.");
    }

    expect(serverErr.devErrors[0]).toBeInstanceOf(Error);
    if (!(serverErr.devErrors[0] instanceof Error)) {
      throw new Error(
        "Expected devErrors[0] for a ServerError to be an Error.",
      );
    }

    expect(serverErr.message).toBe(FOO_TXT);
    expect(serverErr.devErrors[0]).toBe(err);
  });

  it("inputErrs defined as an express-validator ValidationError will set the msg as the ServerError message and set it as a ValidationError in devErrors", () => {
    const MOCK_VALIDATION_ERR: ValidationError = {
      type: "field",
      value: undefined,
      msg: "Invalid value",
      path: "password",
      location: "body",
    };
    const serverErr = new ServerError(
      undefined,
      undefined,
      MOCK_VALIDATION_ERR,
    );

    expect(Array.isArray(serverErr.devErrors)).toBe(true);
    if (!Array.isArray(serverErr.devErrors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.message).toBe(MOCK_VALIDATION_ERR.msg);
    expect(serverErr.devErrors[0]).toBe(MOCK_VALIDATION_ERR);
  });

  it("inputErrs defined as an array will be directly assigned to the instance", () => {
    const serverErr = new ServerError(undefined, [FOO_TXT, BAR_TXT]);

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(typeof serverErr.errors[0]).toBe("string");
    expect(serverErr.errors[0]).toBe(FOO_TXT);
    expect(serverErr.errors[1]).toBe(BAR_TXT);
    expect(serverErr.errors).toHaveLength(2);
  });

  it("inputErrs defined as a string will set it as a string in errors", () => {
    const serverErr = new ServerError(undefined, FOO_TXT);

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.errors[0]).toBe(FOO_TXT);
    expect(serverErr.errors).toHaveLength(1);
  });

  it("inputErrs defined as an ErrorPageData will set it as an ErrorPageData in errors", () => {
    const serverErr = new ServerError(undefined, {
      heading: FOO_TXT,
      content: BAR_TXT,
    });

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(isErrorPageData(serverErr.errors[0])).toBe(true);
    if (!isErrorPageData(serverErr.errors[0])) {
      throw new Error(
        "Expected errors[0] for a ServerError to be an ErrorPageData.",
      );
    }

    expect(serverErr.errors[0].heading).toBe(FOO_TXT);
    expect(serverErr.errors[0].content).toBe(BAR_TXT);
    expect(serverErr.errors).toHaveLength(1);
  });

  it('statusCode 401 defaults message and errors to "Unauthorized"', () => {
    const serverErr = new ServerError(401);

    expect(serverErr.message).toBe("Unauthorized");

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.errors[0]).toBe("Unauthorized");
  });

  it('statusCode 404 defaults message and errors to "Not found"', () => {
    const serverErr = new ServerError(404);

    expect(serverErr.message).toBe("Not found");

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.errors[0]).toBe("Not found");
  });

  it('statusCode 400 defaults message and errors to "Bad request"', () => {
    const serverErr = new ServerError(400);

    expect(serverErr.message).toBe("Bad request");

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.errors[0]).toBe("Bad request");
  });

  it('statusCode 500 defaults message and errors to "Internal server error"', () => {
    const serverErr = new ServerError(500);

    expect(serverErr.message).toBe("Internal server error");

    expect(Array.isArray(serverErr.errors)).toBe(true);
    if (!Array.isArray(serverErr.errors)) {
      throw new Error("Expected errors for a ServerError to be an array.");
    }

    expect(serverErr.errors[0]).toBe("Internal server error");
  });
});

describe("ServerError utils", () => {
  it("isErrorPageData returns false when a string is checked", () => {
    expect(isErrorPageData("notanerrorpage")).toBe(false);
  });

  it("isErrorPageData returns false when an empty object is checked", () => {
    expect(isErrorPageData({})).toBe(false);
  });

  it("isErrorPageData returns true when an ErrorPageData with only a heading is checked", () => {
    expect(isErrorPageData({ heading: FOO_TXT })).toBe(true);
  });

  it("isErrorPageData returns true when an ErrorPageData with only a content is checked", () => {
    expect(isErrorPageData({ content: BAR_TXT })).toBe(true);
  });

  it("isErrorPageData returns true when an ErrorPageData with both a heading and content is checked", () => {
    expect(isErrorPageData({ heading: FOO_TXT, content: BAR_TXT })).toBe(true);
  });

  it("isServerError returns false when a normal Error is checked", () => {
    expect(isServerError(new Error())).toBe(false);
  });

  it("isServerError returns true when a ServerError is checked", () => {
    expect(isServerError(new ServerError())).toBe(true);
  });
});
