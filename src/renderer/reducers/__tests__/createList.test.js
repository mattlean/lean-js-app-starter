import createList from '../createList'
import { fetchTodosSuccess } from '../../actions'
import { mockDatabase } from '../../util/mockAPI'

const all = createList('all')
const defaultState = { ids: [] }
let state = {}

describe('createList reducer', () => {
  it('should return the initial state', () => {
    expect(all(undefined, defaultState)).toEqual(defaultState)
  })

  it('should handle FETCH_TODOS_SUCCESS', () => {
    const action = fetchTodosSuccess('all', mockDatabase.todos)

    state = all(defaultState, action)
    expect(state.ids).toEqual(action.response.result)
  })
})

describe('createList selectors', () => {
  test('getIds() should return IDs', () => {
    const todoIds = mockDatabase.todos.map(todo => todo.id)

    expect(state.ids).toEqual(todoIds)
  })
})
