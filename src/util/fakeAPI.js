// @flow
import { v4 } from 'uuid'

import type { Todo } from '../types/todo'

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true
  }, {
    id: v4(),
    text: 'ho',
    completed: true
  }, {
    id: v4(),
    text: 'let us go',
    completed: false
  }]
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = (filter: string): Promise<Array<Todo>> => delay(500).then(() => {
  switch(filter) {
  case 'all':
    return fakeDatabase.todos
  case 'active':
    return fakeDatabase.todos.filter(t => !t.completed)
  case 'completed':
    return fakeDatabase.todos.filter(t => t.completed)
  default:
    throw new Error(`Unknown filter: ${filter}`)
  }
})
