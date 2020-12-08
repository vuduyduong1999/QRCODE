// import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import { MainRoute } from './src/routes'
import store from './src/redux/store'

const App = (props) => {
  const { } = props

  return (
    <Provider store={store}>
      <MainRoute />
      <FlashMessage position="top" />
    </Provider>
  )
}
export default App
