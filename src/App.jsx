import React, { useEffect } from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import ToMakeSandwich from './ToMakeSandwich'

export default function App() {
  useEffect(() => {
    changeNavigationBarColor('#a091ce')
  }, [])
  return (
    <View>
      <StatusBar barStyle={'light-content'} backgroundColor={'#a091ce'} />
      <ScrollView style={style.app}>
        <ToMakeSandwich />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  app: {
    backgroundColor: '#a091ce',
    height: '100%'
  }
})
