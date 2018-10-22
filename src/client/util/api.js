// @flow
import fetch from 'cross-fetch'
import moment from 'moment'

import HTTPErr from '../util/HTTPErr'
import settings from './apiSettings'
import type { ReplyData, ThreadData } from '../types'

let rootPath = '/api/'
if(settings.api) rootPath = settings.api

const setReceived = (res) => {
  if(Array.isArray(res)) {
    res.forEach(thread => {
      thread.received = new Date().toJSON()
    })
  } else {
    res.received = new Date().toJSON()
  }
  return res
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
    .then(res => setReceived(res))
}

export const isFresh = (received?: string) => {
  if(!received) return false

  const a = moment()
  const b = moment(received)

  if(moment.duration(a.diff(b)).as('seconds') > 60) {
    return false
  }
  return true
}

export const postReply = (id: string, data: ReplyData) => fetch(`${rootPath}thread/${id}/reply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
  .then(res => setReceived(res))

export const postThread = (data: ThreadData) => fetch(`${rootPath}thread`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
  .then(res => setReceived(res))
