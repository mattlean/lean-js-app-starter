import { fetchTodosSuccess } from '../../actions'
import { mockDatabase } from '../../util/mockAPI'
import reducer, { defaultState, getTodo } from '../byId'

const filter = 'all'

describe('byId reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {})

        expect(state).toEqual(defaultState)
    })

    it('should handle action response', () => {
        const action = fetchTodosSuccess(filter, mockDatabase.todos)
        const state = reducer(defaultState, action)

        expect(state).toEqual(action.response.entities.todos)
    })
})

describe('byId selectors', () => {
    test('getTodo() should return todo', () => {
        const action = fetchTodosSuccess(filter, mockDatabase.todos)
        const state = reducer(defaultState, action)
        const todo = mockDatabase.todos[0]

        expect(getTodo(state, todo.id)).toEqual(todo)
    })

    test('getTodo() should return undefined when todo is not found', () => {
        const state = reducer(defaultState, {})

        expect(getTodo(state, '123')).toEqual(undefined)
    })
})
