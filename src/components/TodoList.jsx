import React from 'react'

import Todo from './Todo'

const TodoList = ({ onTodoClick, todos }) => (
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
