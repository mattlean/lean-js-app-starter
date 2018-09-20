// @flow
import type { Todo } from '../types/todo'

const todo = (state?: Todo, action) => {
  switch(action.type) {
  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    }

  case 'TOGGLE_TODO':
    if(state) {
      if(state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    }

    return state

  default:
    return state
  }
}

const todos = (state: Array<Todo> = [], action: {type: string, id: number, text: string}) => {
  switch(action.type) {
  case 'ADD_TODO':
    return [
      ...state,
      todo(undefined, action)
    ]

  case 'TOGGLE_TODO':
    return state.map<?Todo>(t => todo(t, action))

  default:
    return state
  }
}

export default todos
