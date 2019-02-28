// @flow
import React from 'react'

import Page from '../Page'

const Counter = ({ counter, onMinusClick, onPlusClick }: {
  counter: number,
  onMinusClick: () => void,
  onPlusClick: () => void
}) => <Page>
  <div id="counter">
    <p>Count: {counter}</p>
    <div>
      <button onClick={onPlusClick}>+</button>
      <button onClick={onMinusClick}>-</button>
    </div>
  </div>
</Page>

export default Counter
