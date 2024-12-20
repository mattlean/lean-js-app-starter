import { HttpResponse, http } from "msw";

import {
  MOCK_THREAD_INCLUDES_REPLY,
  MOCK_THREAD_W_COMMENT,
} from "../MOCK_DATA";

export const handlers = [
  http.get("http://localhost:3000/api/v1/threads", () =>
    HttpResponse.json({
      data: [],
      info: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 0,
      },
    }),
  ),

  http.get("http://localhost:3000/api/v1/threads/:threadId", () =>
    HttpResponse.json({
      data: MOCK_THREAD_W_COMMENT,
    }),
  ),

  http.post("http://localhost:3000/api/v1/threads", () =>
    HttpResponse.json({
      data: MOCK_THREAD_W_COMMENT,
    }),
  ),

  http.post("http://localhost:3000/api/v1/threads/:threadId/reply", () =>
    HttpResponse.json({
      data: MOCK_THREAD_INCLUDES_REPLY,
    }),
  ),
];
