import React, { useEffect, useState } from 'react'
import {
  View, Dimensions,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import moment from 'moment'
import { createFilter } from 'react-native-search-filter'
import localization from 'moment/locale/vi'
import * as Animatable from 'react-native-animatable'
import { TextStyles, COLORS } from '../../../assets/styles'
import { Header, Text } from '../../components'
import { ICONS } from '../../../assets/icons'
import { IMAGES } from '../../../assets/images'
import { NavigationHelper } from '../../utils'

const { width } = Dimensions.get('window')
const rate = width / 375
const HistoryScreen = (props) => {
  const { route } = props
  const session_code = route?.params?.session_code
  const date = route?.params?.date
  const [search, setSearch] = useState('')
  const history = useSelector(createSelector((state) => state.history, (his) => his.listHistory))
  const [dates, setDates] = useState(moment(date).locale('vi', localization).format('ddd, DD MMM, YYYY'))
  const renderListItem = ({ item, index }) => {
    return (<ItemHistory data={item} index={index} />)
  }
  useEffect(() => {
  }, [history])
  const filterListHistory = history.filter(createFilter(search, ['barcode']))
  const handleBack = () => { NavigationHelper.navigationToBack() }
  // ---------------------
  return (
    <View style={{ flex: 1 }}>

      <Header
        title={session_code}
        imageLeft={ICONS.Back}
        handleLeft={handleBack}
      />
      <View style={styles.container}>
        <View style={styles.type}>
          <View style={styles.btnType}>
            <Text style={{ ...TextStyles.semiBold, color: COLORS.WHITE }}>
              CODE (
              {history.length}
              )
            </Text>
          </View>

        </View>

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
            onChangeText={(t) => { setSearch(t) }}
            placeholder="Tìm theo mã"
            value={search}
          />
        </View>
        <View style={{ marginBottom: 10 * rate }}>
          <Text style={{ ...TextStyles.semiBold }}>{dates}</Text>

        </View>
        {/* item */}
        <FlatList
          data={filterListHistory}
          keyExtractor={(item) => item.barcode}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          extraData={null}
        />

      </View>

    </View>
  )
}
export default HistoryScreen
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
    width: 345 * rate,
    height: 40 * rate,
    backgroundColor: COLORS.GREY_M,
    padding: 10 * rate,
    marginBottom: 33 * rate,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 345 * rate,
    height: 85 * rate,
    borderRadius: 20 * rate,
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    padding: 15 * rate,
    marginBottom: 15 * rate,

  },
})
const ItemHistory = ({ data, index }) => {
  return (
    <Animatable.View
      animation="fadeInLeft"
      delay={index * 100}
      style={styles.item}
    >
      <FastImage
        source={IMAGES.QRcode}
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
          Mã:
          <Text style={{ ...TextStyles.semiBold }}>
            {' '}
            {data?.barcode}
          </Text>
        </Text>
        <Text style={{ color: COLORS.GREY }}>
          Người quét:
          <Text style={{ ...TextStyles.semiBold }}>{data?.account_user}</Text>
        </Text>
        <Text style={{ color: COLORS.GREY }}>{moment(data?.create_date).locale('vi', localization).format('hh:mm DDMMM YYYY')}</Text>
      </View>
    </Animatable.View>
  )
}
