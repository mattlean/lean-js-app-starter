const counter = (state = 0, action) => {
  if(action.type === 'INCREMENT') {
    return state + 1
  } else if(action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
}

export default counter
