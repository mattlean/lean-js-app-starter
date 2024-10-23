import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { fetchTodos, toggleTodo } from '../actions'
import FetchError from '../components/FetchError'
import TodoList from '../components/TodoList'
import { getErrorMessage, getIsFetching, getVisibleTodos } from '../reducers'

class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData()
        }
    }

    fetchData() {
        const { filter, fetchTodos } = this.props
        fetchTodos(filter)
    }

    render() {
        const { errorMessage, isFetching, toggleTodo, todos } = this.props

        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }

        if (errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            )
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo} />
    }
}

VisibleTodoList.propTypes = {
    errorMessage: PropTypes.string,
    fetchTodos: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object),
    toggleTodo: PropTypes.func.isRequired,
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all'

    return {
        errorMessage: getErrorMessage(state, filter),
        filter,
        isFetching: getIsFetching(state, filter),
        todos: getVisibleTodos(state, filter),
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchTodos,
            toggleTodo,
        },
        dispatch,
    )

const VisibleTodoListContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList),
)

export default VisibleTodoListContainer
