// @flow

const visibilityFilter = (state: string = 'SHOW_ALL', action: {type: string, filter: string}) => {
  switch(action.type) {
  case 'SET_VISIBILITY_FILTER':
    return action.filter
  default:
    return state
  }
}

export default visibilityFilter
