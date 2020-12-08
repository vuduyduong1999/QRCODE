import React, { useEffect, useState } from 'react'
import {
  View, Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,

} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import moment from 'moment'
import { createFilter } from 'react-native-search-filter'
import localization from 'moment/locale/vi'
import Modal from 'react-native-modal'
import * as Animatable from 'react-native-animatable'
import { TextStyles, COLORS } from '../../../assets/styles'
import { Header, Text } from '../../components'
import { ICONS } from '../../../assets/icons'
// import { IMAGES } from '../../../assets/images'
import { historyAction } from '../../redux/actions'
import { Helpers, NavigationHelper } from '../../utils'
import { SCREEN_NAME } from '../../configs'
import {
  Calendar,
} from '../../components/Calendar'

const { width } = Dimensions.get('window')
const rate = width / 375
const SessionScreen = () => {
  // const { } = props
  const listSession = useSelector(createSelector((state) => state.history, (history) => history.listSession))
  const [search, setSearch] = useState('')
  const [isMadalCalendar, setIsModalCalendar] = useState(false)

  useEffect(() => {

  }, [])
  const filterSession = listSession.filter(createFilter(search, ['session_code', 'create_date']))
  const handleOff = (istrue, value) => {
    if (istrue) { setSearch(value) }
    setIsModalCalendar(false)
  }
  const renderListItem = ({ item, index }) => {
    return (<ItemSession data={item} index={index} />)
  }
  const handleSearch = (t) => { setSearch(t) }
  const handleCalendar = () => { setIsModalCalendar(true) }
  // ----------------------
  return (
    <View style={{ flex: 1 }}>
      {/* Modal calendar  */}
      <ModalCalendar isVisible={isMadalCalendar} handleOff={handleOff} />
      <Header title="Phiên làm việc" />
      <View style={styles.container}>
        <View style={styles.type}>
          <View style={styles.btnType}>
            <Text style={{ ...TextStyles.semiBold, color: COLORS.WHITE }}>QR CODE</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 33 * rate }}>

          <View style={styles.search}>
            <FastImage
              source={ICONS.Search}
              style={{
                height: 20 * rate,
                width: 20 * rate,
                marginRight: 10 * rate,
              }}
              resizeMode="contain"
              tintColor={COLORS.GREY}
            />
            <TextInput
              style={{ ...TextStyles.semiBold, padding: 0, flex: 1 }}
              onChangeText={handleSearch}
              placeholder="Tìm theo mã, hoặc ngày"
              value={search}
            />
          </View>
          <TouchableOpacity onPress={handleCalendar}>
            <FastImage
              source={ICONS.Caclendar}
              style={{
                height: 25 * rate,
                width: 25 * rate,
                marginLeft: 15 * rate,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>

        {/* item */}
        <FlatList
          data={filterSession}
          keyExtractor={(item) => item.session_code}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          extraData={null}
        />

      </View>
    </View>

  )
}
export default SessionScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15 * rate,
    paddingBottom: 110 * rate,
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20 * rate,
  },
  btnType: {
    width: 345 * rate,
    height: 45 * rate,
    borderRadius: 10 * rate,
    backgroundColor: COLORS.PRIMARY_RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    borderRadius: 20 * rate,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 40 * rate,
    backgroundColor: COLORS.GREY_M,
    padding: 10 * rate,

  },
})
const ItemSession = ({ data, index }) => {
  const dispatch = useDispatch()
  const token = useSelector(createSelector((state) => state.user, (user) => user.token))
  const handlePress = () => {
    dispatch(historyAction.GET_HISTORY({ token, session_code: data?.session_code }, (response) => {
      // console.tron.log({ response })
      if (response?.success) {
        NavigationHelper.navigationToScreenInRoot(SCREEN_NAME.WITHOUT_BOTTOMBAR,
          SCREEN_NAME.MAIN.HISTORY, { session_code: data?.session_code, date: data?.create_date })
      } else { Helpers.showMess(response?.message) }
    }))
  }
  return (
    <Animatable.View
      animation="fadeInLeft"
      delay={index * 100}
    >
      <TouchableOpacity onPress={handlePress}>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: 345 * rate,
          height: 85 * rate,
          borderRadius: 20 * rate,
          backgroundColor: COLORS.WHITE,
          elevation: 2,
          padding: 15 * rate,
          marginBottom: 15 * rate,

        }}
        >
          <FastImage
            source={ICONS.sessionQR}
            style={{
              width: 50 * rate,
              height: 50 * rate,
              marginRight: 20 * rate,
            }}
            resizeMode="contain"
            tintColor="black"
          />
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.GREY }}>
              Phiên làm việc
              <Text style={{ ...TextStyles.semiBold }}>
                {' '}
                {data?.session_code}
              </Text>
            </Text>
            <Text style={{ color: COLORS.GREY }}>{moment(data?.create_date).locale('vi', localization).format('hh:mm DDMMM YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>)
}
const ModalCalendar = ({ isVisible, handleOff }) => {
  const [dayPick, setDatePick] = useState({ dateString: moment().format('YYYY-MM-D') })
  const handleContinue = (day) => {
    setDatePick(day)
  }
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
      backdropOpacity={0.3}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View>
        <Calendar
          // enableSwipeMonths
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
  const onPressRight = () => {
    props.addMonth(1)
    setCalendars(moment(calendars).add(1, 'M'))
  }
  const onPressLeft = () => {
    props.addMonth(-1)
    setCalendars(moment(calendars).add(-1, 'M'))
  }
  const [calendars, setCalendars] = useState(moment(month))
  const styless = StyleSheet.create({
    textT: { ...TextStyles.latoblackSmall, color: COLORS.GREY },
    textCN: { ...TextStyles.latoblackSmall, color: 'red' },
  })
  return (
    <View
      ref={ref}
      style={{
        // backgroundColor: '#FCC',
        // flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: -4,
        padding: 8,
      }}
    >
      <Text style={{ ...TextStyles.bold, color: COLORS.BLACK }}>{calendars.year()}</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10 * rate,
        justifyContent: 'space-between',
        paddingHorizontal: 10 * rate,
      }}
      >
        <TouchableOpacity
          onPress={onPressLeft}
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
          onPress={onPressRight}
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
