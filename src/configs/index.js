import { ICONS } from '../../assets/icons'

export const URL = 'https://qrcode.satavan.vn'
export const SCREEN_NAME = {
  LOGIN: 'LOGIN',
  SPLASH_SCREEN: 'SPLASH_SCREEN',
  WITHOUT_BOTTOMBAR: 'WITHOUT_BOTTOMBAR',
  BOTTOMBAR: 'BOTTOMBAR',
  HISTORY: {
    SESSION: 'SESSION',
    H_SESSION: 'H_SESSION',
  },
  PROFILE: {
    UPDATE: 'UPDATE',
    CHANGE_PASS: 'CHANGE_PASS',
  },
  MAIN: {
    QRCODE: 'QRCODE',
    HISTORY: 'HISTORY',
    ACCOUNT: 'ACCOUNT',
  },
}
export const TAB_DATA = [
  {
    title: 'Lịch sử',
    image: ICONS.History,
  },
  {
    title: 'Quét mã',
    image: ICONS.QRcode,
  },
  {
    title: 'Tài khoản',
    image: ICONS.User,
  },

]
