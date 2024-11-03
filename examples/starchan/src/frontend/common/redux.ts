import { configureStore } from "@reduxjs/toolkit";

import {
  apiMiddleware,
  apiReducer,
  apiReducerPath,
} from "../features/api/apiSlice";
import { appErrorsReducer } from "../features/errors/appErrorsSlice";
import { formErrorReducer } from "../features/errors/formErrorSlice";
import { formInputsReducer } from "../features/formInputs/formInputsSlice";

/**
 * Build the Redux store with preconfigured options.
 * @param preloadedState
 * @returns A new Redux store
 */
export const buildStore = (
  preloadedState?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) =>
  configureStore({
    reducer: {
      [apiReducerPath]: apiReducer,
      appErrors: appErrorsReducer,
      formError: formErrorReducer,
      formInputs: formInputsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiMiddleware),
    preloadedState,
  });
