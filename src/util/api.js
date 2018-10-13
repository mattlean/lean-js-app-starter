// @flow
import fetch from 'cross-fetch'

import type { ReplyData, ThreadData } from '../types'

let rootPath = '/api/'

if(process.env.NODE_ENV === 'test') {
  rootPath = 'http://localhost:8080/api/'
}

export const getThreads = (id?: string) => {
  let path = `${rootPath}thread`

  if(id) {
    path += `/${id}`
  }

  return fetch(path)
    .then(res => res.json())
    .catch(err => console.error('Fetch failed!'))
}

export const postReply = (id: string, data: ReplyData) => fetch(`${rootPath}thread/${id}/reply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .catch(err => console.error('Fetch failed!'))

export const postThread = (data: ThreadData) => fetch(`${rootPath}thread`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res =>  res.json())
  .catch(err => console.error('Fetch failed!'))
