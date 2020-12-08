import { historyType } from '../types'

export const GET_HISTORY = (data, callback) => {
  return {
    type: historyType.GET_HISTORY,
    payload: { data, callback },
  }
}
export const GET_SESSION_LIST = (data, callback) => {
  return {
    type: historyType.GET_SESSION_LIST,
    payload: { data, callback },
  }
}
