// @flow

export const setDocTitle = (title?: string): string => {
  let newTitle = '*chan'
  if(title && title !== '*chan') {
    newTitle = `${title} - *chan`
  }
  document.title = newTitle
  return newTitle
}
