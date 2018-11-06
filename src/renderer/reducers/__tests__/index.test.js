import rootReducer, { getErrorMessage, getIsFetching, getVisibleTodos } from '../index'
import { fetchTodosFailure, fetchTodosRequest, fetchTodosSuccess } from '../../actions'
import { mockDatabase } from '../../util/mockAPI'

let state = {}
const filter = 'all'

describe('root selector', () => {
  test('getErrorMessage() should return null when todos fetch was successful', () => {
    state = rootReducer(undefined, fetchTodosSuccess('all', mockDatabase.todos))

    expect(getErrorMessage(state, filter)).toBe(null)
  })

  test('getErrorMessage() should return error message when todos fetch was successful', () => {
    state = rootReducer(undefined, fetchTodosFailure('all', 'Boom!'))

    expect(getErrorMessage(state, filter)).toBe('Boom!')
  })

  test('getIsFetching() should return true when todos fetch was initiated', () => {
    state = rootReducer(undefined, fetchTodosRequest('all'))

    expect(getIsFetching(state, filter)).toBe(true)
  })

  test('getVisibleTodos() should return visible todos', () => {
    state = rootReducer(undefined, fetchTodosSuccess('all', mockDatabase.todos))

    expect(getVisibleTodos(state, filter)).toEqual([
      {
        id: '24236ed7-e956-4cad-90e9-65469c554fc0',
        text: 'hey',
        completed: true
      },
      {
        id: '3df29b26-8f55-4722-abbd-428a3b3d3306',
        text: 'ho',
        completed: true
      },
      {
        id: 'afe441fd-b058-4eef-be6c-867f9956eba3',
        text: 'let us go',
        completed: false
      }
    ])
  })
})
