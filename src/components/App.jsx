// @flow
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import nodeTurtle from '../assets/imgs/nodejs.png'

type State = {
  count: number
}

class App extends Component<*, State> {
  state = {
    count: 0
  }

  add = () => {
    this.setState(state => ({ count: state.count + 1 }))
  }

  render() {
    return <div>
      <h1>Hello, world!</h1>
      <button onClick={this.add}>+</button>
      <p>Count: {this.state.count}</p>
      <img src={nodeTurtle} />
    </div>
  }
}

export default hot(module)(App)
