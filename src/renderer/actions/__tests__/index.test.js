import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { normalize } from 'normalizr'

import * as actions from '../index'
import todos from '../../reducers'
import { arrayOfTodos, todo } from '../../types/schema'
import { mockDatabase } from '../../util/mockAPI'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
  const newTodoText = 'new todo'
  test(`addTodo('${newTodoText}')`, () => {
    const store = mockStore(todos(undefined, {}))

    return store.dispatch(actions.addTodo(newTodoText)).then(action => {
      expect(store.getActions()).toEqual([action])
    })
  })

  test('fetchTodos(\'all\')', () => {
    const expectedActions = [
      {
        type: 'FETCH_TODOS_REQUEST',
        filter: 'all'
      },
      {
        type: 'FETCH_TODOS_SUCCESS',
        filter: 'all',
        response: normalize(mockDatabase.todos, arrayOfTodos)
      }
    ]

    const store = mockStore(todos(undefined, {}))

    return store.dispatch(actions.fetchTodos('all')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('toggleTodo(\'{id}\')', () => {
    const newTodo = {
      ...mockDatabase.todos[0],
      completed: false
    }

    const expectedActions = [
      {
        type: 'TOGGLE_TODO_SUCCESS',
        response: normalize(newTodo, todo)
      }
    ]

    const store = mockStore(todos(undefined, {}))

    return store.dispatch(actions.toggleTodo(mockDatabase.todos[0].id)).then(action => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
