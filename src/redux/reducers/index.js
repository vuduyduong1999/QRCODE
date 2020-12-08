import { combineReducers } from 'redux'
import user from './user'
import history from './history'
import barcode from './barcode'

const appReducer = combineReducers({
  user,
  history,
  barcode,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
