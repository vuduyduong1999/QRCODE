import React from 'react'
// import { SCREEN_NAME } from '../configs'
import { StackActions } from '@react-navigation/routers'

export const navigationRef = React.createRef()

export const navigationToScreen = (name, params) => navigationRef.current?.navigate(name, params)
export const navigationToScreenInRoot = (nameroot, name, params) => navigationRef.current?.navigate(nameroot, { screen: name, params })
export const navigationToBack = () => navigationRef.current?.goBack()
export const navigationToBackWithOnGoBack = (params) => params.onGoBack()
export const navigateReplaceScreen = (name, params) => navigationRef.current?.dispatch(StackActions.replace(name, params))
export const navigationToScreenWithOption = (name, option) => navigationRef.current?.navigate({ screen: name, navigationOptions: option })
