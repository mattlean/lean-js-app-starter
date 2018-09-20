import React from 'react'

import AddTodo from '../containers/AddTodo'
import Footer from './Footer'
import store from '../store'
import VisibleTodoList from '../containers/VisibleTodoList'

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <button onClick={() => {
      console.log(store.getState())
    }}>Output Store</button>
  </div>
)

export default TodoApp
