import React from 'react'
import {
  SafeAreaView, View, TouchableOpacity, Image, Dimensions,
} from 'react-native'
import { COLORS, TextStyles } from '../../../assets/styles'
import { TAB_DATA } from '../../configs'
import Text from './TextComponent'

const { width } = Dimensions.get('window')
const rate = width / 375
const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <SafeAreaView style={{
      alignItems: 'center',
      position: 'absolute',
      bottom: 10 * rate,
      width,
      zIndex: 1000,
    }}
    >
      <View style={{
        flexDirection: 'row',
        backgroundColor: COLORS.GREY_LIGHT,
        borderRadius: 20 * rate,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 345 * rate,
        height: 70 * rate,
        elevation: 2,

      }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <TouchableOpacity
              onPress={onPress}
              key={`tabbar-${route.key}`}
              style={{
                flex: 1, alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Image
                source={TAB_DATA[index].image}
                style={{
                  width: 24,
                  height: 24,
                  marginBottom: 4,
                  tintColor: isFocused ? COLORS.PRIMARY_RED : COLORS.GREY,
                }}
                resizeMode="contain"
              />

              {isFocused && <Text
                style={{ ...TextStyles.latoRegular, color: COLORS.PRIMARY_RED }}
              >
                {label}
              </Text>}
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default MyTabBar
