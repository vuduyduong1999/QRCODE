import { barcodeType } from '../types'

const initState = {
  // lenght: 0,
}

const userReducer = (state = initState, action) => {
  // const { lenght } = state

  switch (action.type) {
    case barcodeType.BARCODE_SUCCESS:
      return {
        ...state,
      }
    default:
      return state
  }
}
export default userReducer
