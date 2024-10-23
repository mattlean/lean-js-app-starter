import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import FetchError from '../FetchError'

Enzyme.configure({ adapter: new Adapter() })

describe('FetchError', () => {
    it('renders properly', () => {
        const component = shallow(<FetchError />)
        expect(component).toMatchSnapshot()
    })
})
