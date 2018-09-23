// @flow
const counter = (state: number = 0, action: { type: string }) => {
  if(action.type === 'INCREMENT') {
    return state + 1
  } else if(action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
}

export default counter
