import {
  fetchTodosFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
} from "../../actions";
import { mockDatabase } from "../../util/mockAPI";
import createList, { getErrorMessage, getIds } from "../createList";

const filter = "all";
const reducer = createList(filter);
const defaultState = reducer(undefined, {});

describe("createList reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, defaultState)).toEqual(defaultState);
  });

  it("should handle FETCH_TODOS_REQUEST", () => {
    const action = fetchTodosRequest(filter);
    const state = reducer(defaultState, action);

    expect(state.isFetching).toEqual(true);
  });

  it("should handle FETCH_TODOS_SUCCESS", () => {
    const action = fetchTodosSuccess(filter, mockDatabase.todos);
    const state = reducer(defaultState, action);

    expect(state.ids).toEqual(action.response.result);
  });

  it("should handle FETCH_TODOS_FAILURE", () => {
    const message = "Boom!";
    const action = fetchTodosFailure(filter, message);
    const state = reducer(defaultState, action);

    expect(state.message).toEqual();
  });
});

describe("createList selectors", () => {
  test("getErrorMessage() should return error message", () => {
    const message = "Boom!";
    const fetchTodosFailureAction = fetchTodosFailure(filter, message);
    const state = reducer(defaultState, fetchTodosFailureAction);

    expect(getErrorMessage(state)).toEqual(message);
  });

  test("getIds() should return IDs", () => {
    const todoIds = mockDatabase.todos.map((todo) => todo.id);
    const fetchTodosSuccessAction = fetchTodosSuccess(
      filter,
      mockDatabase.todos,
    );
    const state = reducer(defaultState, fetchTodosSuccessAction);

    expect(getIds(state)).toEqual(todoIds);
  });
});
