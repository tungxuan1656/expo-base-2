import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { registerRootComponent } from 'expo'
import App from './App'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    'Inter-Bold': require('../resources/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('../resources/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../resources/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../resources/fonts/Inter-SemiBold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <App />
}

registerRootComponent(RootLayout)
