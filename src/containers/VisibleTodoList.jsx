import React, { Component } from 'react'

import TodoList from '../components/TodoList'
import store from '../store'

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
  case 'SHOW_ALL':
    return todos
  case 'SHOW_COMPLETED':
    return todos.filter(t => t.completed)
  case 'SHOW_ACTIVE':
    return todos.filter(t => !t.completed)
  }
}

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={
          id => store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    )
  }
}

export default VisibleTodoList
