// @flow
import React from 'react'
import type { Match } from 'react-router-dom'

import AddTodo from '../containers/AddTodo'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'

const TodoApp = ({ match }: { match: Match }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={match.params.filter || 'all'} />
    <Footer />
  </div>
)

export default TodoApp
