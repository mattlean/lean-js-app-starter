import React from 'react'

import store from '../store'

let nextTodoId = 0

const AddTodo = () => {
  let input

  return (
    <>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = ''
      }}>
        Add Todo
      </button>
    </>
  )
}



export default AddTodo
