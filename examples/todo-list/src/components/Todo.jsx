// @flow
import React from 'react'

const Todo = ({
    completed,
    onClick,
    text,
}: {
    completed: boolean,
    onClick: () => void,
    text: string,
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none',
        }}
    >
        {text}
    </li>
)

export default Todo
