import I18n from '@/controllers/languages/I18n'
import { useAppDispatch } from '@/controllers/redux'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { appNavigationRef } from './AppNavigation'
import { StackActions } from '@react-navigation/native'
import { AppRoute } from './AppRoute'
import messaging from '@react-native-firebase/messaging'

const AppLaunching = () => {
  const dispatch = useAppDispatch()
  const [doneSplash, setDoneSplash] = useState(false)
  const isSignedIn = false

  useEffect(() => {
    messaging().requestPermission()
    messaging()
      .getToken()
      .then((value) => {
        console.log(value)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (doneSplash) {
      if (appNavigationRef.isReady()) {
        if (isSignedIn) {
          appNavigationRef.dispatch(StackActions.replace(AppRoute.AppTabBar))
        } else {
          appNavigationRef.dispatch(StackActions.replace(AppRoute.AppTabBar))
        }
      }
    }
  }, [doneSplash, isSignedIn])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoneSplash(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  console.log('[Render] AppLaunching')

  /**
   * Set language
   */
  useEffect(() => {
    const initLng = 'vi'
    // dispatch(AppActions.changeLanguage(initLng))
    I18n.changeLanguage(initLng)
      .then(() => console.log('Set language:', initLng))
      .catch((e) => console.log(e))
  }, [])

  return null
}

export default AppLaunching

const styles = StyleSheet.create({})
