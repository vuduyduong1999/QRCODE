// import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, SplashScreen } from '../screens'
import { SCREEN_NAME } from '../configs'
import BottomBarRoute from './BottomBarRoute'
import WithoutBottomBarRoute from './WithoutBottomBarRoute'
import { navigationRef } from '../utils/NavigationHelper'

const Stack = createStackNavigator()

const MainRoute = (props) => {
  const { } = props

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAME.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAME.BOTTOMBAR} component={BottomBarRoute} />
        <Stack.Screen name={SCREEN_NAME.WITHOUT_BOTTOMBAR} component={WithoutBottomBarRoute} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MainRoute
