// @flow
import * as React from 'react'

type LinkType = {
  active: boolean,
  children?: React.Node,
  onClick: () => void
}

const Link = ({ active, children, onClick }: LinkType) => {
  if(active) {
    return <span>{children}</span>
  }

  return (
    <a
      href="#"
      onClick={evt => {
        evt.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

export default Link
