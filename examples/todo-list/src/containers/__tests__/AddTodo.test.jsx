import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'

import todos from '../../reducers'
import { setupStore } from '../../util/store'
import AddTodo from '../AddTodo'

describe('AddTodo', () => {
    it('renders properly', () => {
        const container = renderer.create(
            <Provider store={setupStore(todos, null, [thunk])}>
                <AddTodo />
            </Provider>,
        )
        expect(container).toMatchSnapshot()
    })
})
