import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import Modal from 'react-native-modal'
import { TextStyles, COLORS } from '../../../assets/styles'
import { Header, Text } from '../../components'
// import { ICONS } from '../../../assets/icons'
import { IMAGES } from '../../../assets/images'
import { Helpers, NavigationHelper } from '../../utils'
import { SCREEN_NAME } from '../../configs'
import { userAction } from '../../redux/actions'

const { width } = Dimensions.get('window')
const rate = width / 375
const UserScreen = () => {
  const dispatch = useDispatch()
  // const { } = props
  const token = useSelector(createSelector((state) => state.user, (user) => user.token))
  const profile = useSelector(createSelector((state) => state.user, (user) => user.profile))
  const [isConfirm, setIsConfirm] = useState(false)
  useEffect(() => {
    dispatch(userAction.GET_PROFILE({ token }, (response) => {
      if (!response?.success) {
        Helpers.showMess('Không thể tải thông tin tài khoản')
      }
    }))
  }, [])
  const handleConfirm = () => {
    dispatch({ type: 'LOGOUT' })
    NavigationHelper.navigationToScreen(SCREEN_NAME.LOGIN)
  }
  const handleEdit = () => { NavigationHelper.navigationToScreenInRoot(SCREEN_NAME.WITHOUT_BOTTOMBAR, SCREEN_NAME.PROFILE.UPDATE) }
  // -----------------
  return (
    <View
      style={styles.container}
    >
      <ModalConfirm
        isVisible={isConfirm}
        handleOff={() => { setIsConfirm(false) }}
        handleConfirm={handleConfirm}
      />
      <SafeAreaView />
      <Header title="Tài khoản" />
      <View style={styles.avatar}>
        <View style={{ width: 80 * rate, height: 80 * rate }}>
          <FastImage
            source={IMAGES.imageProfile}
            style={{
              height: 80 * rate,
              width: 80 * rate,
              borderRadius: 40 * rate,
            }}
            resizeMode="contain"
          />
          {/* <View style={styles.edit}>
              <FastImage
                source={ICONS.Edit}
                style={{
                  height: 12 * rate,
                  width: 12 * rate,
                }}
                resizeMode="contain"
              />
            </View> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
          {/* <View style={{ alignItems: 'center', paddingVertical: 15 * rate }}>
          <Text style={{ ...TextStyles.bold }}>Tài khoản</Text>
        </View> */}

          <View style={styles.item_end}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.PRIMARY_RED }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Text>Họ tên</Text>
            <Text style={{ ...TextStyles.semiBold }}>{profile?.name}</Text>
          </View>
          <View style={styles.item}>
            <Text>Số điện thoại</Text>
            <Text style={{ ...TextStyles.semiBold }}>{profile?.phone}</Text>
          </View>
          <View style={styles.item}>
            <Text>Email</Text>
            <Text style={{ ...TextStyles.semiBold }}>{profile?.email}</Text>
          </View>
          <View style={styles.item}>
            <Text>Giới tính</Text>
            <Text style={{ ...TextStyles.semiBold }}>
              {profile?.generic}
            </Text>
          </View>
          <View style={styles.item}>
            <Text>Ngày sinh</Text>
            <Text style={{ ...TextStyles.semiBold }}>{profile?.birthday}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              setIsConfirm(true)
            }}
            >
              <View style={{
                height: 50 * rate,
                width: 255 * rate,
                backgroundColor: COLORS.PRIMARY_RED,
                borderRadius: 10 * rate,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
                <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default UserScreen
const ModalConfirm = ({ isVisible, handleConfirm, handleOff }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationInTiming={100}
      animationOutTiming={500}
      delay={100}
      animationOut="fadeOutRight"
      backdropColor={COLORS.BLACK}
      onBackdropPress={() => { handleOff() }}
      backdropOpacity={0.5}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{
        width: 345 * rate,
        height: 106 * rate,
        backgroundColor: 'white',
        borderRadius: 15 * rate,
        alignItems: 'center',
        padding: 15 * rate,
      }}
      >
        <Text style={{ ...TextStyles.latoblackSmall }}>Bạn chắc chắn muốn đăng xuất?</Text>
        <View style={{
          flexDirection: 'row',
          width: 315 * rate,
          marginTop: 20 * rate,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        >

          <TouchableOpacity onPress={() => {
            handleConfirm()
            handleOff()
          }}
          >
            <View style={{
              height: 35 * rate,
              width: 110 * rate,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10 * rate,
              backgroundColor: COLORS.PRIMARY_RED,
            }}
            >
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Đồng ý</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOff}>
            <View style={{
              height: 35 * rate,
              width: 110 * rate,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10 * rate,
              backgroundColor: COLORS.GREY_LIGHT,
            }}
            >
              <Text style={{ ...TextStyles.latoblackSmall }}>Hủy</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  edit: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 23 * rate,
    height: 23 * rate,
    borderRadius: 23 * rate,
    borderWidth: 2 * rate,
    borderColor: 'white',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.GREY,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.GREY_M,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    paddingBottom: 18 * rate,
    marginBottom: 20 * rate,
  },
  item_end: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: COLORS.GREY_M,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    paddingBottom: 18 * rate,
    marginBottom: 20 * rate,
  },
  container: { backgroundColor: 'white', flex: 1 },
  avatar: { alignItems: 'center', marginTop: 10 * rate, marginBottom: 50 * rate },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15 * rate,
    paddingBottom: 110 * rate,
  },
})
