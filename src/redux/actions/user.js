import { userType } from '../types'

export const LOGIN = (data, callback) => {
  return {
    type: userType.LOGIN,
    payload: { data, callback },
  }
}
export const GET_PROFILE = (data, callback) => {
  return {
    type: userType.GET_PROFILE,
    payload: { data, callback },
  }
}
export const UPDATE_PROFILE = (data, callback) => {
  return {
    type: userType.UPDATE_PROFILE,
    payload: { data, callback },
  }
}
