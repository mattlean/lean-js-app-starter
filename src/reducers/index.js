import { combineReducers } from 'redux'

import todos from './todos'
import visibilityFilter from './visibilityFilter'

export const counter = (state = 0, action) => {
  if(action.type === 'INCREMENT') {
    return state + 1
  } else if(action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
}

// export const addCounter = (list) => {
//   return [...list, 0]
// }
//
// export const removeCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     ...list.slice(index + 1)
//   ]
// }
//
// export const incrementCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     list[index] + 1,
//     ...list.slice(index + 1)
//   ]
// }
//
// export const toggleTodo = (todo) => {
//   return {
//     ...todo,
//     completed: !todo.completed
//   }
// }

export const todoApp = combineReducers({
  todos,
  visibilityFilter
})
