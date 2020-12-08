import { historyType } from '../types'

const initState = {
  listHistory: [],
  listSession: [],
}

const historyReducer = (state = initState, action) => {
  const data = action?.payload?.data

  switch (action.type) {
    case historyType.GET_SESSION_LIST_SUCCESS:
      return {
        ...state, listSession: [...data],
      }
    case historyType.GET_HISTORY_SUCCESS:
      return {
        ...state, listHistory: [...data],
      }

    default:
      return state
  }
}
export default historyReducer
