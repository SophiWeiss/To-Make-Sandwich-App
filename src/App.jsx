import React, { useEffect } from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
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
      <ScrollView style={style.app}>
        <ToMakeSandwich />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  app: {
    backgroundColor: colors.backgroundDark,
    height: '100%'
  }
})
