import createList, { getErrorMessage, getIds } from '../createList'
import { fetchTodosFailure, fetchTodosRequest, fetchTodosSuccess } from '../../actions'
import { mockDatabase } from '../../util/mockAPI'

const all = createList('all')
const defaultState = all(undefined, {})
let state = {}

describe('createList reducer', () => {
  it('should return the initial state', () => {
    expect(all(undefined, defaultState)).toEqual(defaultState)
  })

  it('should handle FETCH_TODOS_REQUEST', () => {
    const action = fetchTodosRequest('all')

    state = all(defaultState, action)
    expect(state.isFetching).toEqual(true)
  })

  it('should handle FETCH_TODOS_SUCCESS', () => {
    const action = fetchTodosSuccess('all', mockDatabase.todos)

    state = all(defaultState, action)
    expect(state.ids).toEqual(action.response.result)
  })

  it('should handle FETCH_TODOS_FAILURE', () => {
    const message = 'Boom!'
    const action = fetchTodosFailure('all', message)

    state = all(defaultState, action)
    expect(state.message).toEqual()
  })
})

describe('createList selectors', () => {
  test('getErrorMessage() should return error message', () => {
    const message = 'Boom!'
    const fetchTodosFailureAction = fetchTodosFailure('all', message)

    state = all(defaultState, fetchTodosFailureAction)
    expect(getErrorMessage(state)).toEqual(message)
  })

  test('getIds() should return IDs', () => {
    const todoIds = mockDatabase.todos.map(todo => todo.id)
    const fetchTodosSuccessAction = fetchTodosSuccess('all', mockDatabase.todos)

    state = all(defaultState, fetchTodosSuccessAction)
    expect(getIds(state)).toEqual(todoIds)
  })
})
