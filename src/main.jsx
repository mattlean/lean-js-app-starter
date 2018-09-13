// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import nodeTurtle from './assets/imgs/nodejs.png'
import './main.scss'

const root = document.getElementById('root')


if(root) {
  ReactDOM.render(
    <div>
      <h1>Hello, world!</h1>
      <img src={nodeTurtle} />
    </div>,
    root
  )
}
