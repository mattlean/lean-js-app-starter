// @flow
import { combineReducers } from 'redux'

import todos from './todos'
import visibilityFilter from './visibilityFilter'

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
