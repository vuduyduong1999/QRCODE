// import 'react-native-gesture-handler'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { SessionScreen, HistoryScreen, UpdateUserScreen } from '../screens'
import { SCREEN_NAME } from '../configs'

const Stack = createStackNavigator()
Stack.navigationOptions = ({ navigation }) => {
  return {
    swipeEnabled: true,
  }
}
const RouteHistory = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAME.PROFILE.UPDATE} component={UpdateUserScreen} />
      <Stack.Screen name={SCREEN_NAME.MAIN.HISTORY} component={HistoryScreen} options={{ navigationOptions: { gesturesEnabled: true } }} />

    </Stack.Navigator>
  )
}
export default RouteHistory
