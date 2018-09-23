// @flow
import type { Todo } from '../types/todo'

export const todo = (state?: Todo, action: { type: string, id: number, text: string, completed: boolean }) => {
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

export default todo
