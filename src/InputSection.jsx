import React, { useRef } from 'react'
import { TextInput, StyleSheet, View, Keyboard } from 'react-native'
import { colors } from './colors'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import CallendarEventFill from './svg/CallendarEventFill'
import ButtonsTuple from './ButtonsTuple'
import PlusCircleFill from './svg/PlusCircleFill'

export default function InputSection({
  inputValue,
  deadlineValue,
  onInputChange,
  onAddButtonPress,
  onDeadlineChange
}) {
  const inputRef = useRef(null)

  const updateDateTimePicker = (e, date, mode) => {
    onDeadlineChange(e, date, mode)
    if (e.type === 'set') {
      if (mode === 'date') openDateTimePicker('time')
      if (mode === 'time') setTimeout(() => inputRef.current.focus(), 200)
    }
  }

  const openDateTimePicker = mode => {
    Keyboard.dismiss()
    DateTimePickerAndroid.open({
      value: deadlineValue === null ? new Date() : deadlineValue,
      onChange: (e, date) => updateDateTimePicker(e, date, mode),
      mode
    })
  }

  return (
    <View style={style.inputSection}>
      <TextInput
        ref={inputRef}
        style={style.textInput}
        placeholder={'What u wanna do?'}
        placeholderTextColor={colors.textLight}
        blurOnSubmit={false}
        value={inputValue}
        onChangeText={onInputChange}
        onSubmitEditing={() => onAddButtonPress()}
      />
      <ButtonsTuple
        style1={!deadlineValue && { backgroundColor: colors.backgroundLight }}
        button1={
          <CallendarEventFill
            fill={deadlineValue ? 'white' : colors.textLight}
          />
        }
        button2={<PlusCircleFill />}
        onPress1={() => openDateTimePicker('date')}
        onPress2={onAddButtonPress}
      />
    </View>
  )
}

const style = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.backgroundLight,
    borderRadius: 7,
    fontSize: 19,
    color: colors.textDark
  }
})
