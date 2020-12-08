import React, { useEffect, useState } from 'react'
import {
  View, Dimensions, StyleSheet, TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'
import { TextStyles, COLORS } from '../../../assets/styles'
import Text from './TextComponent'

const { width } = Dimensions.get('window')
const rate = width / 375
// imageLeft, imageRight, imageCenter, title,
const HeaderComponent = (props) => {
  const {
    handleLeft, handleRight, imageLeft, imageRight, imageCenter, title = ' ', transparent, comWhite,
  } = props
  const styles = StyleSheet.create({
    Header: {
      backgroundColor: COLORS.WHITE,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width,
      padding: 15 * rate,

    },
    HeaderT: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width,
      padding: 15 * rate,

    },
    iconSide: {
      height: 20 * rate,
      width: 20 * rate,

    },
    iconCenter: {
      width: 58 * rate,
      height: 41 * rate,
    },

  })
  if (!title && !imageCenter) {
    return (
      <View style={transparent ? styles.HeaderT : styles.Header}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        >
          <Text style={{ ...TextStyles.optionBold, color: comWhite ? COLORS.WHITE : COLORS.BLACK }}>Nhập imageCenter hoặc title </Text>
        </View>
      </View>
    )
  }
  if (!imageLeft && !imageRight) {
    return (
      <View style={transparent ? styles.HeaderT : styles.Header}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        >
          {imageCenter && <FastImage
            source={imageCenter}
            style={styles.iconCenter}
            resizeMode="contain"
            tintColor={comWhite ? COLORS.WHITE : ''}
          />}
          {title && <Text style={{ ...TextStyles.optionBold, color: comWhite ? COLORS.WHITE : COLORS.BLACK }}>{title}</Text>}
        </View>
      </View>
    )
  }
  if (!imageRight) {
    return (
      <View style={transparent ? styles.HeaderT : styles.Header}>
        <TouchableOpacity onPress={handleLeft}>
          <FastImage
            source={imageLeft}
            style={styles.iconSide}
            resizeMode="contain"
            tintColor={comWhite ? COLORS.WHITE : ''}
          />
        </TouchableOpacity>
        <View style={{
          marginRight: (styles.iconSide.width + 3) * rate,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        >
          {imageCenter && <FastImage
            source={imageCenter}
            style={styles.iconCenter}
            resizeMode="contain"
            tintColor={comWhite ? COLORS.WHITE : ''}
          />}
          {title && <Text style={{ ...TextStyles.optionBold, color: comWhite ? COLORS.WHITE : COLORS.BLACK }}>{title}</Text>}
        </View>
      </View>
    )
  }
  if (!imageLeft) {
    return (
      <View style={transparent ? styles.HeaderT : styles.Header}>
        <View style={{
          marginLeft: (styles.iconSide.width + 3) * rate,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        >
          {imageCenter && <FastImage
            source={imageCenter}
            style={styles.iconCenter}
            resizeMode="contain"
            tintColor={comWhite ? COLORS.WHITE : ''}
          />}
          {title && <Text style={{ ...TextStyles.optionBold, color: comWhite ? COLORS.WHITE : COLORS.BLACK }}>{title}</Text>}
        </View>
        <TouchableOpacity onPress={handleRight}>
          <FastImage
            source={imageRight}
            style={styles.iconSide}
            resizeMode="contain"
            tintColor={comWhite ? COLORS.WHITE : ''}
          />

        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={transparent ? styles.HeaderT : styles.Header}>
      <TouchableOpacity onPress={handleLeft}>
        <FastImage
          source={imageLeft}
          style={styles.iconSide}
          resizeMode="contain"
          tintColor={comWhite ? COLORS.WHITE : ''}
        />
      </TouchableOpacity>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
      >
        {imageCenter && <FastImage
          source={imageCenter}
          style={styles.iconCenter}
          resizeMode="contain"
          tintColor={comWhite ? COLORS.WHITE : ''}
        />}
        {title && <Text style={{ ...TextStyles.optionBold, color: comWhite ? COLORS.WHITE : COLORS.BLACK }}>{title}</Text>}
      </View>
      <TouchableOpacity onPress={handleRight}>
        <FastImage
          source={imageRight}
          style={styles.iconSide}
          resizeMode="contain"
          tintColor={comWhite ? COLORS.WHITE : ''}
        />

      </TouchableOpacity>
    </View>
  )
}
HeaderComponent.propTypes = {
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
  imageLeft: PropTypes.number,
  imageRight: PropTypes.number,
  imageCenter: PropTypes.object,
  title: PropTypes.string,
  transparent: PropTypes.bool,
  comWhite: PropTypes.bool,
}

export default HeaderComponent
