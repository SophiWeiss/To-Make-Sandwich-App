import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native'

import ToMakeSandwich from './ToMakeSandwich'

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={'#a091ce'} />
      <ScrollView style={style.app}>
        <ToMakeSandwich />
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  app: {
    backgroundColor: '#a091ce',
    height: '100%'
  }
})
