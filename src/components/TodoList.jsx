// @flow
import React from 'react'

import Todo from './Todo'

import type { Todo as TodoType } from '../types/todo'

type TodoListType = {
  onTodoClick: (id: number) => void,
  todos: Array<TodoType>
}

const TodoList = ({ onTodoClick, todos }: TodoListType) => (
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
