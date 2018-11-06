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
  const filter = 'all'
  const newTodoText = 'new todo'

  test(`addTodo('${newTodoText}')`, () => {
    const store = mockStore(todos(undefined, {}))

    return store.dispatch(actions.addTodo(newTodoText)).then(action => {
      expect(store.getActions()).toEqual([action])
    })
  })

  test(`fetchTodos('${filter}') creates FETCH_TODOS_REQUEST and FETCH_TODOS_SUCCESS when successful todos fetch occurs`, () => {
    const expectedActions = [
      {
        type: 'FETCH_TODOS_REQUEST',
        filter
      },
      {
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(mockDatabase.todos, arrayOfTodos)
      }
    ]

    const store = mockStore(todos(undefined, {}))

    return store.dispatch(actions.fetchTodos(filter)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  const message = 'Boom!'
  test(`fetchTodosFailure('${filter}', '${message}') creates an action that ends todos fetch request with failure`, () => {
    const expectedAction = {
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message
    }

    expect(actions.fetchTodosFailure(filter, message)).toEqual(expectedAction)
  })

  test(`fetchTodosRequest('${filter}') creates an action that starts todos fetch request`, () => {
    const expectedAction = {
      type: 'FETCH_TODOS_REQUEST',
      filter
    }

    expect(actions.fetchTodosRequest(filter)).toEqual(expectedAction)
  })

  test(`fetchTodosSuccess('${filter}', {OBJECT}) creates an action that ends todos fetch request successfully`, () => {
    const expectedAction = {
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response: normalize(mockDatabase.todos, arrayOfTodos)
    }

    expect(actions.fetchTodosSuccess(filter, mockDatabase.todos)).toEqual(expectedAction)
  })

  test('toggleTodo(\'{ID}\')', () => {
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
