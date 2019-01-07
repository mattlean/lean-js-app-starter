// @flow

import type { Action_Decrement, Action_Increment } from '../types'

export const decrement = (): Action_Decrement => ({ type: 'DECREMENT' })

export const increment = (): Action_Increment => ({ type: 'INCREMENT' })
