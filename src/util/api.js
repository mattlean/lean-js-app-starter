// @flow
import fetch from 'cross-fetch'

import HTTPErr from '../util/HTTPErr'
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

  return fetch(path).then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)

    return res.json()
  })
}

export const postReply = (id: string, data: ReplyData) => fetch(`${rootPath}thread/${id}/reply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => res.json())

export const postThread = (data: ThreadData) => fetch(`${rootPath}thread`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => res.json())
