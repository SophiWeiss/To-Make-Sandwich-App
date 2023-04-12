import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { colors } from './colors'

function TodoData({ text, date, done }) {
  const dateColorStyle = {
    color: date < Date.now() && !done ? '#b3287b' : '#8282ba'
  }
  const lineThroughStyle = {
    textDecorationLine: done ? 'line-through' : 'none'
  }

  return (
    <View style={style.todoData}>
      <Text style={[style.text, lineThroughStyle]}>{text}</Text>
      {date !== null && (
        <Text numberOfLines={1} style={[style.date, dateColorStyle]}>
          {new Date(date).toLocaleString().slice(0, -3)}
        </Text>
      )}
    </View>
  )
}

function TodoButtons({
  id,
  text1,
  text2,
  showFirst = true,
  onPress1,
  onPress2
}) {
  const dynamicBorderRadiusStyle = {
    borderBottomLeftRadius: showFirst ? 0 : 5,
    borderTopLeftRadius: showFirst ? 0 : 5
  }

  return (
    <View style={style.todoButtons}>
      {showFirst && (
        <TouchableOpacity
          id={id}
          style={[style.todoButton, style.button1]}
          onPress={onPress1}
        >
          <Text style={style.todoButtonText}>{text1}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        id={id}
        style={[style.todoButton, style.button2, dynamicBorderRadiusStyle]}
        onPress={onPress2}
      >
        <Text style={style.todoButtonText}>{text2}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function TodoItem({
  id,
  text,
  date,
  done,
  editValue,
  onPress,
  onDeleteButtonPress,
  onEditButtonPress,
  onSaveButtonPress,
  onCancelButtonPress,
  onEditInputChange
}) {
  return (
    <TouchableOpacity
      id={id}
      style={style.todoItem}
      onPress={editValue === null ? onPress : null}
    >
      {editValue === null ? (
        <>
          <TodoData {...{ text, date, done }} />
          <TodoButtons
            id={id}
            text1={'Edit'}
            text2={'Delete'}
            showFirst={!done}
            onPress1={onEditButtonPress}
            onPress2={onDeleteButtonPress}
          />
        </>
      ) : (
        <>
          <TextInput
            id={id}
            value={editValue}
            onChangeText={onEditInputChange}
            style={style.editInput}
          />
          <TodoButtons
            id={id}
            text1={'Save'}
            text2={'Cancel'}
            onPress1={onSaveButtonPress}
            onPress2={onCancelButtonPress}
          />
        </>
      )}
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#d8cef1',
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  editInput: {
    color: colors.textDark,
    fontSize: 18,
    flex: 1,
    padding: 10,
    backgroundColor: '#f1eeff',
    borderRadius: 7,
    marginRight: 10
  },
  todoData: {
    flex: 1
  },
  text: {
    color: colors.textDark,
    fontSize: 18,
    marginRight: 4
  },
  date: {
    fontSize: 11
  },
  todoButtons: {
    flexDirection: 'row',
    marginLeft: 10
  },
  todoButton: {
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 5
  },
  todoButtonText: {
    fontSize: 18
  },
  button1: {
    backgroundColor: '#d074d7',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  button2: {
    backgroundColor: '#7e74d7'
  }
})
