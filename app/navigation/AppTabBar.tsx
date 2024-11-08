import { AppColors, AppFontSize, AppIcons } from '@/assets'
import { AppTypo } from '@/constants'
import I18n from '@/controllers/languages/I18n'
import { AppActions } from '@/controllers/redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux'

const Tab = createBottomTabNavigator()

export enum AppTabBarRoute {
  TabDashboard = 'TabBar_TabDashboard',
}

const Empty = () => {
  return null
}

export default function AppTabBar() {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  console.log('[Render] AppTabBar')

  useEffect(() => {
    dispatch(AppActions.setTabBarIsFocused({ isFocused }))
  }, [isFocused])

  const renderIcon = useCallback(({ color, source }: any) => {
    return <Image source={source} style={{ width: 28, height: 28, tintColor: color }} />
  }, [])

  const renderLabel = useCallback(({ focused, color, value }: any) => {
    return (
      <Text
        style={[
          focused ? AppTypo.caption.semiBold : AppTypo.caption.regular,
          { color, fontSize: AppFontSize.x_small, lineHeight: undefined },
        ]}>
        {value}
      </Text>
    )
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: AppColors.blue400,
        tabBarInactiveTintColor: AppColors.gray400,
        tabBarItemStyle: { paddingVertical: 2 },
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: { overflow: 'hidden' },
        lazy: false,
      })}>
      <Tab.Screen
        name={AppTabBarRoute.TabDashboard}
        component={Empty}
        options={{
          tabBarLabel: ({ focused, color }) =>
            renderLabel({ color, focused, value: I18n.t('tabBar.dashboard') }),
          tabBarIcon: ({ color }) => renderIcon({ color, source: AppIcons.ico_home }),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})
