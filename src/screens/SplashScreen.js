import React, { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import SplashScreenLib from 'react-native-splash-screen'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import moment from 'moment'
import { Helpers, NavigationHelper } from '../utils'
import { SCREEN_NAME } from '../configs'
import { historyAction, userAction } from '../redux/actions'

const SplashScreen = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const persist = useSelector((state) => state._persist)
  const date = useSelector(createSelector((state) => state.user, (user) => user.date))
  useEffect(() => {
    // SplashScreenLib.hide()
    if (persist.rehydrated) {
      SplashScreenLib.hide()
      if (date === moment().format('DDD, YYYY')) {
        if (user?.token) {
          const timeout = setTimeout(() => {
            dispatch(historyAction.GET_SESSION_LIST({ token: user.token }, (response) => {
              // console.tron.log({ response })

              NavigationHelper.navigateReplaceScreen(SCREEN_NAME.BOTTOMBAR)
              if (!response?.success) {
                Helpers.showMess('Không thể tải phiên làm việc')
              }
            }))

            clearTimeout(timeout)
          }, 0)
        } else {
          const timeout = setTimeout(() => {
            clearTimeout(timeout)
            NavigationHelper.navigateReplaceScreen(SCREEN_NAME.LOGIN)
          }, 0)
        }
      } else {
        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          if (date !== '') { Helpers.showMess('Hết phiên đăng nhập ngày!!!') }
          dispatch({ type: 'LOGOUT' })
          NavigationHelper.navigateReplaceScreen(SCREEN_NAME.LOGIN)
        }, 0)
      }
    }
  }, [persist.rehydrated])
  const { } = props
  return (
    <View />
  )
}
export default SplashScreen
