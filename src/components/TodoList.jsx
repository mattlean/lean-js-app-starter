// @flow
import React from 'react'

import Todo from './Todo'

import type { Todo as TodoType } from '../types/todo'

const TodoList = ({ onTodoClick, todos }: { onTodoClick: (id: number) => void, todos: Array<TodoType> }) => (
  <ul>
    {todos.map(
      todo => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )
    )}
  </ul>
)

export default TodoList
