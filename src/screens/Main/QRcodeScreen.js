import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native'
import { RNCamera as Camera } from 'react-native-camera'
import FastImage from 'react-native-fast-image'
import Slider from '@react-native-community/slider'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import Modal from 'react-native-modal'
import Sound from 'react-native-sound'
import BarcodeMask from '../../components/share/react-native-barcode-mask'
import { Text } from '../../components'
import { COLORS, TextStyles } from '../../../assets/styles'
import { ICONS } from '../../../assets/icons'
import { NavigationHelper } from '../../utils'
import { barcodeAction } from '../../redux/actions'

const { width, height } = Dimensions.get('window')
const rate = width / 375
const QRcodeScreen = () => {
  const soungTrue = new Sound('success_full.mp3', Sound.MAIN_BUNDLE, (error) => {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
  })
  // const { } = props
  const dispatch = useDispatch()
  const token = useSelector(createSelector((state) => state.user, (user) => user.token))
  const session_code = useSelector(createSelector((state) => state.user, (user) => user.session_code))
  const [zoom, setZoom] = useState(0)
  const [isFlash, setIsFlash] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const [barcode, setBarcode] = useState(null)
  const [content, setContent] = useState('')

  useEffect(() => {
    if (barcode !== null) {
      dispatch(barcodeAction.READBARCODE({ token, barcode, session_code }, (response) => {
        // console.tron.log({ response })
        if (response) {
          if (response?.result) {
            const rs = response?.result
            if (response?.result?.success) {
              setIsSuccess(true)
              soungTrue.setVolume(1)
              soungTrue.setSpeed(2.5)
              soungTrue.play()
            } else {
              setIsFail(true)
              Vibration.vibrate()
              setContent(rs?.message)
            }
          }
          if (response?.error) {
            const er = response?.error
            setIsFail(true)
            setContent(er?.message)
          }
        }
        const timeout = setTimeout(() => {
          setBarcode(null)
          setIsFail(false)
          setIsSuccess(false)
          clearTimeout(timeout)
        }, 1000)
      }))
    }
  }, [barcode])

  const barcodeRead = (e) => { setBarcode(e.data) }
  const backPress = () => {
    NavigationHelper.navigationToBack()
  }
  const setFlash = () => { setIsFlash(!isFlash) }
  const handleZoom = (nv) => {
    setZoom(nv)
  }
  // ------------------
  return (
    <View style={{ flex: 1 }}>
      <ModalFail isVisible={isFail} content={content} />
      <Camera
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        zoom={zoom}
        style={{ flex: 1 }}
        onBarCodeRead={barcodeRead}
        type="back"
        flashMode={isFlash ? 'torch' : 'off'}
        captureAudio={false}
      >
        <BarcodeMask
          height={280 * (height / 812)}
          width={300 * rate}
          outerMaskOpacity={0.4}
          lineAnimationDuration={800}
          showAnimatedLine={false}
        />
        <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity
              style={{
                // marginTop: 50 * rate,
                width: 15 * rate,
                height: 20 * rate,
              }}
              hitSlop={{
                top: 5, bottom: 5, right: 5, left: 5,
              }}
              onPress={backPress}
            >
              <FastImage
                source={ICONS.Back}
                style={{
                  width: 15 * rate,
                  height: 20 * rate,
                }}
                resizeMode="contain"
                tintColor="white"
              />
            </TouchableOpacity>
            {/* ----------- */}
            {isSuccess && <View style={styles.success}>
              <FastImage
                source={ICONS.Check}
                style={{
                  width: 20 * rate,
                  height: 20 * rate,
                }}
                resizeMode="contain"
                tintColor="white"
              />
            </View>}
          </View>

          <View>
            <Text style={{ ...TextStyles.medium, color: COLORS.WHITE }}>
              Đưa mã sản phẩm vào vùng quét
            </Text>
            <Text style={{ ...TextStyles.medium, color: COLORS.WHITE }}>
              Quét mã vạch, QR, để truy xuất sản phẩm
            </Text>
          </View>
          <View style={styles.bottomOp}>
            <View style={styles.slider}>
              <FastImage
                source={ICONS.ZoomoutBlack}
                style={{
                  width: 20 * rate,
                  height: 20 * rate,
                }}
                resizeMode="contain"
                tintColor="white"
              />
              <Slider
                style={{ width: 255, height: 40 }}
                value={zoom}
                onValueChange={handleZoom}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255,255,255,0.6)"
                thumbTintColor={COLORS.WHITE}
              />
              <FastImage
                source={ICONS.ZoominBlack}
                style={{
                  width: 20 * rate,
                  height: 20 * rate,
                }}
                resizeMode="contain"
                tintColor="white"
              />
            </View>
            <View style={styles.option}>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={setFlash}>
                  <View style={[styles.optionItem]}>
                    {isFlash && <View style={styles.unFlash} />}
                    <FastImage
                      source={ICONS.Torch}
                      style={{
                        width: 20 * rate,
                        height: 20 * rate,
                      }}
                      resizeMode="contain"
                      tintColor="white"
                    />
                  </View>
                </TouchableOpacity>
                <Text style={styles.optionText}>
                  Đèn pin
                </Text>
              </View>

            </View>
          </View>
        </View>
      </Camera>
    </View>
  )
}
export default QRcodeScreen
const ModalFail = ({ content, isVisible }) => {
  return (<Modal
    // onModalHide
    isVisible={isVisible}
    animationIn="fadeIn"
    animationOut="fadeOut"
    backdropColor={COLORS.BLACK}
    onBackdropPress={() => { }}
    backdropOpacity={0.5}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <View style={{
      minHeight: 50 * rate,
      width: 235 * rate,
      backgroundColor: COLORS.WHITE,
      borderRadius: 10 * rate,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10 * rate,
    }}
    >
      <Text style={{ ...TextStyles.latoRegular, fontSize: 12 * rate }}>{content}</Text>
    </View>
  </Modal>)
}
const styles = StyleSheet.create({
  optionItem: {
    height: 45 * rate,
    width: 45 * rate,
    borderRadius: 45 * rate,
    borderColor: COLORS.WHITE,
    borderWidth: 3 * StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { flex: 1, marginTop: 40 * rate },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20 * rate,
    marginBottom: 20 * rate,
    height: 40 * rate,
  },
  success: {
    height: 40 * rate,
    width: 40 * rate,
    backgroundColor: COLORS.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20 * rate,
  },
  bottomOp: {
    marginTop: 320 * rate,
    width: 317 * rate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 290 * rate,
    paddingLeft: 30 * rate,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15 * rate,
    width: 280 * rate,
    paddingLeft: 50 * rate,
    alignItems: 'center',
  },
  optionText: {
    ...TextStyles.medium,
    color: COLORS.WHITE,
    fontSize: 12 * rate,
    marginTop: 5 * rate,
  },
  unFlash: {
    position: 'absolute',
    height: 30 * rate,
    width: 1 * rate,
    backgroundColor: 'white',
    transform: [{ rotate: '-45deg' }],
  },
})
