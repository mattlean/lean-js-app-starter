// @flow
import React from 'react'

import Todo from './Todo'

import type { Todo as TodoType } from '../types/todo'

const TodoList = ({ onTodoClick, todos }: { onTodoClick?: (id: number) => void, todos: Array<TodoType> }) => (
  <ul>
    {todos.map(
      todo => {
        const props = {
          ...todo,
          onClick: undefined
        }

        if(onTodoClick) {
          props.onClick = () => onTodoClick(todo.id)
        }

        return <Todo key={todo.id} {...props} />
      }
    )}
  </ul>
)

export default TodoList
