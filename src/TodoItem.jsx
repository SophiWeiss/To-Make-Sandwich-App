import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { colors } from './colors'
import ButtonsTuple from './ButtonsTuple'
import XCircleFill from './svg/XCircleFill'
import PenFill from './svg/PenFill'
import Save2Fill from './svg/Save2Fill'

function TodoData({ text, date, done }) {
  const dateColorStyle = {
    color: date < Date.now() && !done ? colors.textWarning : colors.textLight
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
      activeOpacity={0.8}
      onPress={editValue === null ? onPress : null}
    >
      {editValue === null ? (
        <>
          <TodoData {...{ text, date, done }} />
          <ButtonsTuple
            id={id}
            button1={<PenFill />}
            button2={<XCircleFill />}
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
          <ButtonsTuple
            id={id}
            button1={<Save2Fill />}
            button2={<XCircleFill />}
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
    backgroundColor: colors.backgroundLighter,
    padding: 20,
    alignItems: 'center'
  },
  editInput: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.backgroundLight,
    borderRadius: 7,
    fontSize: 19,
    color: colors.textDark
  },
  todoData: {
    flex: 1
  },
  text: {
    color: colors.textDark,
    fontSize: 19,
    marginRight: 4
  },
  date: {
    fontSize: 11
  }
})
