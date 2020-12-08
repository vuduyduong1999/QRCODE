import { showMessage } from 'react-native-flash-message'
import { MessageStyles } from '../../assets/styles'

export const showMess = (message, type = 'error') => {
  console.tron.log({ message })
  if (type === 'success') {
    return showMessage({
      message,
      ...MessageStyles.success,
    })
  }
  if (type === 'info') {
    return showMessage({
      message,
      ...MessageStyles.success,
    })
  }
  return showMessage({
    message,
    ...MessageStyles.error,
  })
}
