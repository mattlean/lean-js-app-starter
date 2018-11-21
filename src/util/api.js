import fetch from 'cross-fetch'
import moment from 'moment'

import HTTPErr from '../util/HTTPErr'

let rootPath = '/'
switch(process.env.NODE_ENV) {
  case 'development':
    rootPath = `/api${rootPath}`
    break
  case 'test':
    rootPath = `http://localhost:9001${rootPath}`
    break
  default:
    rootPath = `${__server__}${rootPath}` // eslint-disable-line no-undef
}

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

export const getThreads = id => {
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

export const isFresh = received => {
  if(!received) return false

  const a = moment()
  const b = moment(received)

  if(moment.duration(a.diff(b)).as('seconds') > 60) {
    return false
  }
  return true
}

export const postReply = (id, data) => fetch(`${rootPath}thread/${id}/reply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
  .then(res => setReceived(res))

export const postThread = data => fetch(`${rootPath}thread`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
  .then(res => setReceived(res))
