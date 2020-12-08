// import 'react-native-gesture-handler'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { QRcodeScreen, SessionScreen, UserScreen } from '../screens'
import { SCREEN_NAME } from '../configs'
import MainTabbar from '../components/share/MainTabbar'

const Tab = createBottomTabNavigator()
const SecondRoute = (props) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainTabbar {...props} />}
    // initialRoute={1}
    >
      <Tab.Screen
        name={SCREEN_NAME.HISTORY.H_SESSION}
        component={SessionScreen}
        options={{ title: 'Lịch sử' }}
      />
      <Tab.Screen
        name={SCREEN_NAME.MAIN.QRCODE}
        component={QRcodeScreen}
        options={{ title: 'Quét mã' }}
      />
      <Tab.Screen
        name={SCREEN_NAME.MAIN.ACCOUNT}
        component={UserScreen}
        options={{ title: 'Tài khoản' }}
      />

    </Tab.Navigator>
  )
}
export default SecondRoute
