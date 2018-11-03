import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TodoList from '../components/TodoList'
import { fetchTodos, toggleTodo } from '../actions'
import { getVisibleTodos } from '../reducers'

class VisibleTodoList extends Component {
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
    const { toggleTodo, todos } = this.props

    return <TodoList
      todos={todos}
      onTodoClick={toggleTodo}
    />
  }
}

VisibleTodoList.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object),
  toggleTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'

  return {
    filter,
    todos: getVisibleTodos(state, filter)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
  toggleTodo
}, dispatch)

const VisibleTodoListVar = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList))

export default VisibleTodoListVar
