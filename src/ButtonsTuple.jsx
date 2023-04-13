import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors } from './colors'

export default function ButtonsTuple({
  id,
  button1,
  button2,
  showFirst = true,
  onPress1,
  onPress2
}) {
  const dynamicBorderRadiusStyle = {
    borderBottomLeftRadius: showFirst ? 0 : 7,
    borderTopLeftRadius: showFirst ? 0 : 7
  }

  return (
    <View style={style.buttonsTuple}>
      {showFirst && (
        <TouchableOpacity
          id={id}
          style={[style.button, style.button1]}
          onPress={onPress1}
        >
          {button1}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        id={id}
        style={[style.button, style.button2, dynamicBorderRadiusStyle]}
        onPress={onPress2}
      >
        {button2}
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  buttonsTuple: {
    flexDirection: 'row',
    marginLeft: 10,
    alignSelf: 'stretch'
  },
  button: {
    padding: 14,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 7,
    justifyContent: 'center'
  },
  button1: {
    backgroundColor: colors.buttonPink,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  button2: {
    backgroundColor: colors.buttonPurple
  }
})
