// @flow
import * as React from 'react'
import { NavLink } from 'react-router-dom'

const FilterLink = ({
    children,
    filter,
}: {
    children?: React.Node,
    filter: string,
}) => (
    <NavLink
        to={filter === 'all' ? '' : `/${filter}`}
        activeStyle={{
            textDecoration: 'none',
            color: 'black',
        }}
        exact
    >
        {children}
    </NavLink>
)

export default FilterLink
