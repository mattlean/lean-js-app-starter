import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'

import todos from '../../reducers'
import { setupStore } from '../../util/store'
import VisibleTodoList from '../VisibleTodoList'

describe('VisibleTodoList', () => {
    it('renders properly', () => {
        const container = renderer.create(
            <Provider store={setupStore(todos, null, [thunk])}>
                <Router>
                    <VisibleTodoList />
                </Router>
            </Provider>,
        )
        expect(container).toMatchSnapshot()
    })
})
