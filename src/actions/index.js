import { v4 } from 'uuid'
import * as api from '../util/fakeAPI'

const receiveTodos = (response, filter) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

export const addTodo = (text) => (
  {
    type: 'ADD_TODO',
    id: v4(),
    text
  }
)

export const fetchTodos = filter => (
  api.fetchTodos(filter)
    .then(response => receiveTodos(filter, response))
)

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
