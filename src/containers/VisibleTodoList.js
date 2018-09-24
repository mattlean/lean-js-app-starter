import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../reducers'
import * as actions from '../actions'

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
    const { toggleTodo, ...rest } = this.props
    return <TodoList
      {...rest}
      onTodoClick={toggleTodo}
    />
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'

  return {
    todos: getVisibleTodos(state, filter)
  }
}

const VisibleTodoListVar = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoListVar
