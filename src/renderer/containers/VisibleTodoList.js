import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FetchError from '../components/FetchError'
import TodoList from '../components/TodoList'
import * as actions from '../actions'
import { getErrorMessage, getIsFetching, getVisibleTodos } from '../reducers'

class VisibleTodoList extends Component<{filter: string}, {}> {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter)
  }

  render() {
    const { errorMessage, isFetching, toggleTodo, todos } = this.props

    if(isFetching && !todos.length) {
      return <p>Loading...</p>
    }

    if(errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }

    return <TodoList
      todos={todos}
      onTodoClick={toggleTodo}
    />
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'

  return {
    errorMessage: getErrorMessage(state, filter),
    filter,
    isFetching: getIsFetching(state, filter),
    todos: getVisibleTodos(state, filter)
  }
}

const VisibleTodoListVar = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoListVar
