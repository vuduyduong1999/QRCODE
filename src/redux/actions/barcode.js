import { barcodeType } from '../types'

export const READBARCODE = (data, callback) => {
  return {
    type: barcodeType.BARCODE,
    payload: { data, callback },
  }
}
