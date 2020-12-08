import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')
const rate = width / 375
export const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#B5B5B5',
  GREY_M: '#F5F5F5',
  GREY_LIGHT: '#F7F7F7',
  BLUE: '#60C6FF',
  PRIMARY_RED: '#FC4444',
  RED: '#FF0000',

}

export const Fonts = {
  sf: {
    regular: {
      fontFamily: 'SFProDisplay-Regular',
    },
    bold: {
      fontFamily: 'SFProDisplay-Bold',
    },
    semiBold: {
      fontFamily: 'SFProDisplay-Semibold',

    },
    medium: {
      fontFamily: 'SFProDisplay-Medium',
    },
  },
  lt: {
    black: {
      fontFamily: 'Lato-Black',
    },
    regular: {
      fontFamily: 'Lato-Regular',
    },
  },
}

export const TextStyles = {
  regular: {
    ...Fonts.sf.regular,
    fontSize: 14 * rate,
  },
  bold: {
    ...Fonts.sf.bold,

    fontSize: 16 * rate,
  },
  optionNormal: {
    ...Fonts.sf.regular,
    fontSize: 18 * rate,
  },
  optionBold: {
    ...Fonts.sf.bold,
    fontSize: 18 * rate,

  },
  semiBold: {
    ...Fonts.sf.semiBold,
    fontSize: 14 * rate,
  },
  medium: {
    ...Fonts.sf.medium,
    fontSize: 14 * rate,
    textAlign: 'center',
  },
  mediumNormal: {
    ...Fonts.sf.medium,
    fontSize: 14 * rate,
  },
  latoblackBig: {
    ...Fonts.lt.black,
    fontSize: 24 * rate,
  },
  latoblackSmall: {
    ...Fonts.lt.black,
    fontSize: 14 * rate,
  },
  latoRegular: {
    ...Fonts.lt.regular,
    fontSize: 11 * rate,
  },

}
export const MessageStyles = {
  error: {
    style: {
      backgroundColor: COLORS.PRIMARY_RED,
      alignItems: 'center',
      borderColor: COLORS.WHITE,
      borderWidth: 2 * rate,
    },
    duration: 2000,
    titleStyle: TextStyles.bold,
  },
  success: {
    style: {
      backgroundColor: COLORS.BLUE,
      alignItems: 'center',
      borderColor: COLORS.WHITE,
      borderWidth: 2 * rate,
    },
    duration: 2000,
    titleStyle: TextStyles.bold,

  },
}
