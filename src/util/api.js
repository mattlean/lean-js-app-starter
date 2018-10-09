// @flow
import fetch from 'cross-fetch'

export const getThreads = () => fetch('/api/thread')
  .then(res => res.json())
  .catch(err => console.error('Fetch failed!'))
