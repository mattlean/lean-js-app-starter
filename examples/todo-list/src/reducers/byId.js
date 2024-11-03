// @flow
import type { Action, State_ById } from "../types";

export const defaultState = {};

const byId = (state: State_ById = defaultState, action: Action): State_ById => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }

  return state;
};

export default byId;

export const getTodo = (state: State_ById, id: string) => state[id];
