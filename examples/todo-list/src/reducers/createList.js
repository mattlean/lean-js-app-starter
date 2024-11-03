// @flow
import { combineReducers } from "redux";

import type {
  Action,
  State_List,
  State_List_ErrorMessage,
  State_List_Ids,
  State_List_IsFetching,
} from "../types";

const createList = (filter: string) => {
  const handleToggle = (state: State_List_Ids, action: Action) => {
    if (action.response) {
      const { result: toggledId, entities } = action.response;

      if (!Array.isArray(toggledId)) {
        const { completed } = entities.todos[toggledId];
        const shouldRemove =
          (completed && filter === "active") ||
          (!completed && filter === "completed");

        return shouldRemove ? state.filter((id) => id !== toggledId) : state;
      }
    }

    return state;
  };

  const ids = (state: State_List_Ids = [], action: Action) => {
    switch (action.type) {
      case "ADD_TODO_SUCCESS":
        return filter !== "completed"
          ? [...state, action.response.result]
          : state;
      case "FETCH_TODOS_SUCCESS":
        return filter === action.filter ? action.response.result : state;
      case "TOGGLE_TODO_SUCCESS":
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state: State_List_IsFetching = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case "FETCH_TODOS_REQUEST":
        return true;
      case "FETCH_TODOS_SUCCESS":
      case "FETCH_TODOS_FAILURE":
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state: State_List_ErrorMessage = null, action) => {
    if (filter !== action.filter) {
      return state;
    }

    switch (action.type) {
      case "FETCH_TODOS_FAILURE":
        return action.message;
      case "FETCH_TODOS_REQUEST":
      case "FETCH_TODOS_SUCCESS":
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    errorMessage,
    ids,
    isFetching,
  });
};

export default createList;

export const getErrorMessage = (state: State_List) => {
  if (state.errorMessage || state.errorMessage === null)
    return state.errorMessage;
};

export const getIds = (state: State_List) => {
  if (state.ids) return state.ids;
};

export const getIsFetching = (state: State_List) => {
  if (state.isFetching || state.isFetching === false) return state.isFetching;
};
