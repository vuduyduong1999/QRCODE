import { all } from 'redux-saga/effects'

import userSagas from './user'
import barcodeSagas from './barcode'
import historySagas from './history'

export default function* rootSaga() {
  yield all([
    userSagas(),
    barcodeSagas(),
    historySagas(),
  ])
}
