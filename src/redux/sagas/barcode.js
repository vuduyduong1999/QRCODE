import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { barcodeType } from '../types'
import { URL } from '../../configs'
// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* userSagas() {
  yield takeLatest(barcodeType.BARCODE, readbarcode)
}
function* readbarcode(action) {
  const { data, callback } = action.payload

  try {
    const response = yield call(
      () => axios.post(`${URL}/product_api/create_barcode`, {
        params: data,
      })
    )
    // console.tron.log({ response })

    const ndata = response?.data
    if (ndata.result?.success) {
      yield put({
        type: barcodeType.BARCODE_SUCCESS,
        payload: {},
      })
    }
    callback(ndata)
  } catch (error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
  }
}
