import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { userType } from '../types'
import { URL } from '../../configs'
// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* userSagas() {
  yield takeLatest(userType.LOGIN, login)
  yield takeLatest(userType.GET_PROFILE, getprofile)
  yield takeLatest(userType.UPDATE_PROFILE, updateProfile)
}
function* updateProfile(action) {
  const { data, callback } = action.payload
  try {
    const response = yield call(
      () => axios.post(`${URL}/account_api/update_account_information`, {
        params: data,
      })
    )
    const ndata = response?.data?.result
    if (ndata.success) {
      yield put({
        type: userType.UPDATE_PROFILE_SUCCESS,
        payload: { data: ndata?.data },
      })
    }
    callback(ndata)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
  }
}
function* getprofile(action) {
  const { data, callback } = action.payload
  try {
    const response = yield call(
      () => axios.post(`${URL}/account_api/account_information`, {
        params: data,
      })
    )
    const ndata = response?.data?.result
    if (ndata.success) {
      yield put({
        type: userType.GET_PROFILE_SUCCESS,
        payload: { data: ndata?.data },
      })
    }
    callback(ndata)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
  }
}
function* login(action) {
  const { data, callback } = action.payload
  try {
    const response = yield call(
      () => axios.post(`${URL}/account_api/login`, {
        params: data,
      })
    )
    const ndata = response?.data?.result
    if (ndata.success) {
      yield put({
        type: userType.LOGIN_SUCCESS,
        payload: { data: ndata?.data },
      })
    }
    callback(ndata)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
  }
}
