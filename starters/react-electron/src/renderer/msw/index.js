import { setupServer } from "msw/node";

import { handlers } from "./handlers";

export const server = setupServer(...handlers);

/**
 * Enable MSW to mock network requests with default settings.
 */
export const setupDefaultMsw = () => {
  // Enable API mocking before all the tests.
  beforeAll(() => server.listen());

  // Reset the request handlers between each test.
  // This way the handlers we add on a per-test basis
  // do not leak to other, irrelevant tests.
  afterEach(() => server.resetHandlers());

  // Finally, disable API mocking after the tests are done.
  afterAll(() => server.close());

  return server;
};
