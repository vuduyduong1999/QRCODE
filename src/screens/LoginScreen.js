import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { IMAGES } from '../../assets/images'
import { COLORS, TextStyles } from '../../assets/styles'
import { Text } from '../components'
import { SCREEN_NAME } from '../configs'
import { NavigationHelper, Helpers } from '../utils'
import { historyAction, userAction } from '../redux/actions'

const { width } = Dimensions.get('window')
const rate = width / 375
const LoginScreen = () => {
  const dispatch = useDispatch()
  const [account_user, setUsername] = useState(null)
  const [password, setPassword] = useState('123456')
  const handleSignIn = () => {
    dispatch(userAction.LOGIN({ account_user, password }, (response) => {
      // console.tron.log({ resss: response })
      if (response) {
        if (response?.success) {
          // NavigationHelper.navigateReplaceScreen(SCREEN_NAME.SECONDROUTE)
          dispatch(historyAction.GET_SESSION_LIST({ token: response?.data?.token }, (res) => {
            NavigationHelper.navigateReplaceScreen(SCREEN_NAME.BOTTOMBAR)
            if (!res?.success) {
              Helpers.showMess('Không thể tải phiên làm việc')
            }
          }))
          Helpers.showMess(response.message, 'success')
        } else {
          Helpers.showMess(response.message,)
        }
      } else {
        Helpers.showMess('Không thể đăng nhập ngay lúc này!!!',)
      }
    }))
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      paddingTop: 45 * rate,
      backgroundColor: COLORS.PRIMARY_RED,
    }}
    >
      <Animatable.View
        animation="zoomInDown"
        duration={800}
      >
        <FastImage
          source={IMAGES.Logo}
          style={{
            width: 90 * rate,
            height: 90 * rate,
          }}
          resizeMode="contain"
        />
      </Animatable.View>
      <View style={{
        width: '100%',
        flex: 1,
        marginTop: 60 * rate,
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 40 * rate,
        borderTopRightRadius: 40 * rate,
        paddingHorizontal: 30 * rate,
        paddingTop: 40 * rate,
      }}
      >
        <Animatable.View
          animation="fadeInLeft"
        // duration={300}
        >
          <Text style={{ ...TextStyles.latoblackBig }}>Đăng nhập</Text>
        </Animatable.View>
        <Animatable.View
          animation="fadeInLeft"
          delay={100}
          style={{
            borderBottomColor: COLORS.GREY,
            borderBottomWidth: 2 * StyleSheet.hairlineWidth,
            marginTop: 50 * rate,
          }}
        >
          <Text style={{ marginBottom: 5 * rate }}>
            Tên đăng nhập
          </Text>
          <TextInput
            style={{ ...TextStyles.semiBold, padding: 0 }}
            value={account_user}
            onChangeText={(t) => { setUsername(t) }}
            placeholder="Nhập tên đăng nhập"
          />
        </Animatable.View>
        <Animatable.View
          animation="fadeInLeft"
          delay={200}
          style={{
            borderBottomColor: COLORS.GREY,
            borderBottomWidth: 2 * StyleSheet.hairlineWidth,
            marginTop: 15 * rate,
          }}
        >
          <Text style={{ marginBottom: 5 * rate }}>
            Mật khẩu
          </Text>
          <TextInput
            style={{ ...TextStyles.semiBold, padding: 0 }}
            value={password}
            onChangeText={(t) => { setPassword(t) }}
            secureTextEntry
          />
        </Animatable.View>
        <Animatable.View
          animation="fadeInLeft"
          delay={250}
          style={{ alignItems: 'center', marginTop: 70 * rate }}
        >
          <TouchableOpacity onPress={handleSignIn}>
            <View style={{
              height: 50 * rate,
              width: 255 * rate,
              backgroundColor: COLORS.PRIMARY_RED,
              borderRadius: 10 * rate,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  )
}
export default LoginScreen
