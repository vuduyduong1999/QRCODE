/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { reactotronRedux } from 'reactotron-redux'

// Reactotron.clear()
const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'QRScanner app',
    host: 'localhost',
    port: 9090,
  })
  .useReactNative()
  .use(reactotronRedux())
  .connect()

console.tron = reactotron

export default reactotron
