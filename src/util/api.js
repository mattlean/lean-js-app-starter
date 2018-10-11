// @flow
import fetch from 'cross-fetch'

let rootPath = '/api/'

if(process.env.NODE_ENV === 'test') {
  rootPath = 'http://localhost:8080/api/'
}

export const getThreads = () => fetch(`${rootPath}thread`)
  .then(res => res.json())
  .catch(err => console.error('Fetch failed!'))

export const postThreads = (data: *) => fetch(`${rootPath}thread`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res =>  res.json())
  .catch(err => console.error('Fetch failed!'))
