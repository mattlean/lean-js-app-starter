// @flow

let nextTodoId = 0
export const addTodo = (text: string) => (
  {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
)

export const setVisibilityFilter = (filter: string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
})

export const toggleTodo = (id: number) => ({
  type: 'TOGGLE_TODO',
  id
})
