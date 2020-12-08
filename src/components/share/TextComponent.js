/* eslint-disable react/jsx-props-no-multi-spaces */
import React from 'react'
import { Text, Dimensions, StyleSheet } from 'react-native'
import { Fonts } from '../../../assets/styles'

const { width } = Dimensions.get('window')
const TextComponent = (props) => {
  const { style = {}, children } = props
  const flattenStyle = StyleSheet.flatten(style)
  const { fontSize = 12 } = flattenStyle
  const fontScale = fontSize / 375 * width

  return (
    <Text
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}

      style={{
        ...Fonts.sf.regular,
        color: '#000',
        fontSize: fontScale,
        ...flattenStyle,

      }}

      allowFontScaling={false}
    >
      {children}
    </Text>
  )
}

export default TextComponent
