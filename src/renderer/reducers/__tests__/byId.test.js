import reducer, { defaultState } from '../byId'
import { fetchTodosSuccess } from '../../actions'
import { mockDatabase } from '../../util/mockAPI'

let state = {}

describe('byId reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, defaultState)).toEqual(defaultState)
  })

  it('should handle action response', () => {
    const action = fetchTodosSuccess('all', mockDatabase.todos)

    state = reducer(defaultState, action)
    expect(state).toEqual(action.response.entities.todos)
  })
})

describe('byId selector', () => {
  test('getTodo() should return todo', () => {
    const todo = mockDatabase.todos[0]

    expect(state[todo.id]).toEqual(todo)
  })

  test('getTodo() should return undefined when todo is not found', () => {
    expect(state['123']).toEqual(undefined)
  })
})
