export interface ActionReset {
  type: "reset";
}

export interface ActionSet {
  type: "set";
  payload: string;
}

export type ErrorMessageActions = ActionReset | ActionSet;

export const INITIAL_STATE = "";

/**
 * Reducer responsible for managing the state for error messages.
 */
export const errorMessageReducer = (_: string, action: ErrorMessageActions) => {
  switch (action.type) {
    case "set":
      return `ERROR: ${action.payload}`;
    case "reset":
      return INITIAL_STATE;
    default:
      throw new Error("Error message reducer received unknown action.");
  }
};
