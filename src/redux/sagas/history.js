import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { historyType } from '../types'
import { URL } from '../../configs'
// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* userSagas() {
  yield takeLatest(historyType.GET_HISTORY, getHistory)
  yield takeLatest(historyType.GET_SESSION_LIST, getSessionList)
}
function* getSessionList(action) {
  const { data, callback } = action.payload
  try {
    const response = yield call(
      () => axios.post(`${URL}/account_api/list_session`, {
        params: data,
      })
    )
    // console.tron.log({ response })
    const ndata = response?.data?.result
    if (ndata.success) {
      yield put({
        type: historyType.GET_SESSION_LIST_SUCCESS,
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
function* getHistory(action) {
  const { data, callback } = action.payload

  try {
    const response = yield call(
      () => axios.post(`${URL}/product_api/data_product_barcode`, {
        params: data,
      })
    )
    const ndata = response?.data?.result
    if (ndata.success) {
      yield put({
        type: historyType.GET_HISTORY_SUCCESS,
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
