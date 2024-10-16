import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import App from '../App'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
    it('renders properly', () => {
        const component = shallow(<App />)
        expect(component).toMatchSnapshot()
    })
})
