import React from 'react'

const FetchError = ({ onRetry, message }) => (
  <div>
    <p>Could not fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
)

export default FetchError
