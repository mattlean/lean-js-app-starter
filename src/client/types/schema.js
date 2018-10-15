// @flow
import { schema } from 'normalizr'

export const Thread = new schema.Entity('threads', {}, { idAttribute: '_id' })

export const Threads = new schema.Array(Thread)
