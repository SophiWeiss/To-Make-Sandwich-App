import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors } from './colors'

export default function ButtonsTuple({
  id,
  button1,
  button2,
  onPress1,
  onPress2,
  showFirst = true,
  style1 = null,
  style2 = null,
  flexDirection = 'row'
}) {
  return (
    <View style={[style.buttonsTuple, { flexDirection }]}>
      {showFirst && (
        <TouchableOpacity
          id={id}
          style={[style.button, style.button1, style1]}
          onPress={onPress1}
        >
          {button1}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        id={id}
        style={[style.button, style.button2, style2]}
        onPress={onPress2}
      >
        {button2}
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  buttonsTuple: {
    marginLeft: 10,
    borderRadius: 7,
    overflow: 'hidden'
  },
  button: {
    padding: 14,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center'
  },
  button1: {
    backgroundColor: colors.buttonPink
  },
  button2: {
    backgroundColor: colors.buttonPurple
  }
})
