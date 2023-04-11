import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ToMakeSandwich() {
  return (
    <View style={style.toMakeSandwich}>
      <Text style={style.title}>My To-Do-Sandwich</Text>
    </View>
  )
}

const style = StyleSheet.create({
  toMakeSandwich: {
    margin: 20
  },
  title: {
    color: '#36395a',
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
