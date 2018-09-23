// @flow
import { v4 } from 'uuid'

export const addTodo = (text: string) => (
  {
    type: 'ADD_TODO',
    id: v4(),
    text
  }
)

export const toggleTodo = (id: number) => ({
  type: 'TOGGLE_TODO',
  id
})
