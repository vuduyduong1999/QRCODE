import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import moment from 'moment'
import Modal from 'react-native-modal'
import { Picker } from 'react-native-wheel-datepicker'
import { TextStyles, COLORS } from '../../../assets/styles'
import { Header, Text } from '../../components'
import { ICONS } from '../../../assets/icons'
import { IMAGES } from '../../../assets/images'
import { Helpers, NavigationHelper } from '../../utils'
// import { SCREEN_NAME } from '../../configs'

import { userAction } from '../../redux/actions'
import {
  Calendar,
} from '../../components/Calendar'

const { width } = Dimensions.get('window')
const rate = width / 375
const UpdateUserScreen = () => {
  const dispatch = useDispatch()
  // const { } = props
  const token = useSelector(createSelector((state) => state.user, (user) => user.token))
  const profile = useSelector(createSelector((state) => state.user, (user) => user.profile))
  const [name, setName] = useState(profile?.name)
  const [phone, setPhone] = useState(profile?.phone)
  const [email, setEmail] = useState(profile?.email)
  const [birthday, setBirthday] = useState(profile?.birthday)
  const [generic, setGeneric] = useState(profile?.generic)
  const [isCalendar, setIsCalendar] = useState(false)
  const [isConfrm, setIsConfrm] = useState(false)

  useEffect(() => {

  }, [])
  const handleConfirm = () => {
    dispatch(userAction.UPDATE_PROFILE({
      token, name, phone, email, birthday, generic,
    }, (response) => {
      if (response?.success) {
        Helpers.showMess('Cập nhật thành công', 'success')
        NavigationHelper.navigationToBack()
      } else { Helpers.showMess(response.message) }
    }))
  }
  const handleOffCalendar = (istrue, value) => {
    if (istrue) { setBirthday(value) }
    setIsCalendar(false)
  }
  const handleBack = () => { NavigationHelper.navigationToBack() }
  // -------------------
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* modal  */}
      <ModalCalendar isVisible={isCalendar} handleOff={handleOffCalendar} />
      <ModalConfirm
        isVisible={isConfrm}
        handleOff={() => { setIsConfrm(false) }}
        handleConfirm={handleConfirm}
      />
      <SafeAreaView />
      <Header
        title="Chỉnh sửa tài khoản"
        imageLeft={ICONS.Back}
        handleLeft={handleBack}
      />
      <View style={{ alignItems: 'center', marginTop: 10 * rate }}>
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

        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        <View style={styles.content}>

          <View style={styles.item}>
            <Text>Họ tên</Text>
            <TextInput
              style={styles.input}
              onChangeText={(t) => { setName(t) }}
              value={name}
            />
          </View>
          <View style={styles.item}>
            <Text>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              onChangeText={(t) => { setPhone(t) }}
              value={phone}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.item}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(t) => { setEmail(t) }}
              value={email}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.item}>
            <View style={styles.row}>
              <View style={{}}>
                <Text>Giới tính</Text>
                <Text style={{ ...TextStyles.semiBold, marginBottom: 5 * rate }}>
                  {generic}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  paddingBottom: 5 * rate,
                }}
                onPress={() => {
                  if (generic === 'woman') { setGeneric('man') } else { setGeneric('woman') }
                }}
              >
                <FastImage
                  source={ICONS.refresh}
                  style={{ height: 15 * rate, width: 15 * rate }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => { setIsCalendar(true) }}>
            <View style={styles.item}>
              <Text>Ngày sinh</Text>
              <Text style={{ ...TextStyles.semiBold, marginBottom: 5 * rate }}>{birthday}</Text>

            </View>
          </TouchableOpacity>

          <View style={styles.viewbt}>
            <TouchableOpacity onPress={() => {
              setIsConfrm(true)
            }}
            >
              <View style={styles.button}>
                <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Lưu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </View>
  )
}
export default UpdateUserScreen

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
        <Text style={{ ...TextStyles.latoblackSmall }}>Bạn chắc chắn muốn cập nhật thông tin?</Text>
        <View style={{
          flexDirection: 'row',
          width: 315 * rate,
          marginTop: 20 * rate,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        >
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
          <TouchableOpacity onPress={handleConfirm}>
            <View style={{
              height: 35 * rate,
              width: 110 * rate,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10 * rate,
              backgroundColor: COLORS.PRIMARY_RED,
            }}
            >
              <Text style={{ ...TextStyles.latoblackSmall, color: COLORS.WHITE }}>Lưu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    justifyContent: 'space-between',
    borderColor: COLORS.GREY_M,
    borderWidth: 3 * StyleSheet.hairlineWidth,
    marginBottom: 20 * rate,
    paddingHorizontal: 10 * rate,
    paddingTop: 10 * rate,
    paddingBottom: 5 * rate,
    borderRadius: 10 * rate,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15 * rate,
    paddingBottom: 110 * rate,
    paddingTop: 50 * rate,
  },
  input: {
    ...TextStyles.semiBold,
    padding: 0,
  },
  button: {
    height: 50 * rate,
    width: 255 * rate,
    backgroundColor: COLORS.PRIMARY_RED,
    borderRadius: 10 * rate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewbt: {
    alignItems: 'center',
    width,
    position: 'absolute',
    bottom: 10 * rate,
  },
})
const ModalCalendar = ({ isVisible, handleOff }) => {
  const [dayPick, setDatePick] = useState({ dateString: moment().format('YYYY-MM-D') })
  const handleContinue = (day) => {
    setDatePick(day)
    // console.tron.log(day)
  }
  // console.tron.log({ dayPick })
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
      <View>
        <Calendar
          // enableSwipeMonths
          date
          firstDay={1}
          // showWeekNumbers
          // hideExtraDays
          monthFormat="MMMM"
          onDayPress={handleContinue}
          style={{
            borderRadius: 10 * rate,
            width: 350 * rate,
          }}
          markedDates={{
            [dayPick.dateString]: { selected: true, selectedColor: COLORS.BLUE },
          }}
          theme={{

            todayTextColor: COLORS.BLUE,
            textSectionTitleColor: COLORS.BLACK,
            selectedDayBackgroundColor: '#333248',
            arrowColor: COLORS.PURPLE,
            // textDisabledColor: 'red',
            'stylesheet.calendar.header': {
              week: {
                paddingTop: 15 * rate,
                paddingHorizontal: 10 * rate,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
          }}
          hideExtraDays
          customHeader={CustomHeader}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 * rate }}>
          <TouchableOpacity onPress={() => { handleOff(true, dayPick.dateString) }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 225 * rate,
              height: 45 * rate,
              backgroundColor: COLORS.PRIMARY_RED,
              borderRadius: 10 * rate,
            }}
            >
              <Text style={{ ...TextStyles.bold, color: COLORS.WHITE }}> Tiếp tục</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </Modal>
  )
}
const CustomHeader = React.forwardRef(({
  month, ...props
}, ref) => {
  const onPress = (i) => {
    props.addMonth(i)
    if (i === -1) {
      if (calendars.month() === 0) {
        setCurrentYear(currentYear - 1)
      }
    }
    if (i === 1) {
      if (calendars.month() === 11) {
        setCurrentYear(currentYear + 1)
      }
    }
    setCalendars(moment(calendars).add(i, 'M'))
  }
  const [calendars, setCalendars] = useState(moment(month))
  const styless = StyleSheet.create({
    textT: { ...TextStyles.latoblackSmall, color: COLORS.GREY },
    textCN: { ...TextStyles.latoblackSmall, color: 'red' },
  })
  const [currentYear, setCurrentYear] = useState(calendars.year())
  const year = []
  // useEffect(() => {
  for (let i = -60; i <= 0; i++) {
    year.push(moment().year() + i)
  }
  // })
  return (
    <View
      ref={ref}
      style={{
        // backgroundColor: '#FCC',
        // flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: -4,
        padding: 8,
        overflow: 'hidden',
      }}
    >
      <View style={{
        height: 50 * rate, overflow: 'hidden',
        // alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Picker
          style={{
            height: 50 * rate,

            positions: 'absolute',
            bottom: 70 * rate
          }}
          selectedValue={currentYear}
          pickerData={year}
          onValueChange={(value) => {
            const offset = value - currentYear
            props.addMonth(offset * 12)
            calendars.year(value)
            setCurrentYear(value)
          }}
          itemSpace={50}
        />
      </View>

      {/* <Picker
        key="piker"
        style={{ height: 40 * rate, backgroundColor: 'white' }}
        selectedValue={2020}
        pickerData={year}
        onValueChange={(value, index) => { console.log(value) }}
        
      /> */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20 * rate,
        justifyContent: 'space-between',
        paddingHorizontal: 10 * rate,
      }}
      >
        <TouchableOpacity
          onPress={() => { onPress(-1) }}
          hitSlop={{
            top: 10 * rate, bottom: 10 * rate, right: 10 * rate, left: 10 * rate,
          }}
        >
          {/* <Text>Tap Me</Text> */}
          <FastImage source={ICONS.Back} style={{ height: 10 * rate, width: 5 * rate }} />
        </TouchableOpacity>
        <Text style={{ ...TextStyles.bold, color: COLORS.BLACK }}>
          Tháng
          {' '}
          {calendars.month() + 1}
        </Text>
        <TouchableOpacity
          onPress={() => { onPress(1) }}
          hitSlop={{
            top: 10 * rate, bottom: 10 * rate, right: 10 * rate, left: 10 * rate,
          }}
        >
          {/* <Text>Tap Me</Text> */}
          <FastImage source={ICONS.Next} style={{ height: 10 * rate, width: 5 * rate }} />
        </TouchableOpacity>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20 * rate,
        justifyContent: 'space-between',
        paddingHorizontal: 10 * rate,
      }}
      >
        <Text style={styless.textT}>T2</Text>
        <Text style={styless.textT}>T3</Text>
        <Text style={styless.textT}>T4</Text>
        <Text style={styless.textT}>T5</Text>
        <Text style={styless.textT}>T6</Text>
        <Text style={styless.textT}>T7</Text>
        <Text style={styless.textCN}>CN</Text>
      </View>
    </View>
  )
})
