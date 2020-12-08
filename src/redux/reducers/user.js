/* eslint-disable no-case-declarations */
import moment from 'moment'
import { userType } from '../types'

const initState = {
  token: '',
  session_code: '',
  date: '',
  profile: {},
}

const userReducer = (state = initState, action) => {
  const data = action?.payload?.data

  switch (action.type) {
    case userType.UPDATE_PROFILE_SUCCESS:

      return {
        ...state, profile: { ...data },
      }
    case userType.GET_PROFILE_SUCCESS:

      return {
        ...state, profile: { ...data },
      }
    case userType.LOGIN_SUCCESS:
      const { token, session_code } = data
      return {
        ...state, token, session_code, date: moment().format('DDD, YYYY'),
      }

    default:
      return state
  }
}
export default userReducer
