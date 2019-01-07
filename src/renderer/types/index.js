// @flow

export type Action =
  | Action_Decrement
  | Action_Increment

export type Action_Decrement = {|
  type: 'DECREMENT'
|}

export type Action_Increment = {|
  type: 'INCREMENT'
|}

export type State = {|
  +counter: State_Counter
|} | {||}

export type State_Counter = number
