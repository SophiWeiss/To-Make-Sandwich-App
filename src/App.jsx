import React, { useEffect } from 'react'
import { StatusBar, View, StyleSheet } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import ToMakeSandwich from './ToMakeSandwich'
import { colors } from './colors'

export default function App() {
  useEffect(() => {
    changeNavigationBarColor(colors.backgroundDark)
  }, [])

  return (
    <View>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.backgroundDark}
      />
      <View style={style.app}>
        <ToMakeSandwich />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  app: {
    height: '100%'
  }
})
