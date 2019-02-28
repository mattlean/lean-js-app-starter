// @flow

export const genTitle = (title?: string = '*chan'): string => {
  if(title !== '*chan') {
    return `${title} - *chan`
  }
  return title
}

export const setDocTitle = (title?: string): string => {
  const newTitle = genTitle(title)
  return document.title = newTitle
}
