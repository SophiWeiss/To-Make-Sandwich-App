import React from 'react'
import ProgressBar from './ProgressBar'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from './colors'

export default function ToMakeSandwich() {
  return (
    <View style={style.toMakeSandwich}>
      <Text style={style.title}>My To-Do-Sandwich</Text>
      <ProgressBar progress={0.2} />
    </View>
  )
}

const style = StyleSheet.create({
  toMakeSandwich: {
    margin: 20
  },
  title: {
    color: colors.textDark,
    fontSize: 32,
    fontWeight: 'bold',
    padding: 30,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})
