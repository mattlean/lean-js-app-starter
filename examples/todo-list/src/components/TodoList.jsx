// @flow
import React from 'react'

import type { Todo as TodoType } from '../types'
import Todo from './Todo'

const TodoList = ({
    onTodoClick,
    todos,
}: {
    onTodoClick?: (...args: Array<any>) => any,
    todos: Array<TodoType>,
}) => (
    <ul>
        {todos.map((todo) => {
            const props = {
                ...todo,
                onClick: undefined,
            }

            if (onTodoClick) {
                props.onClick = () => onTodoClick(todo.id)
            }

            return <Todo key={todo.id} {...props} />
        })}
    </ul>
)

export default TodoList
