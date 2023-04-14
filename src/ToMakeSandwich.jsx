import React, { useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native'
import { colors } from './colors'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import TodoItem from './TodoItem'
import InputSection from './InputSection'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ToMakeSandwich() {
  const todosStorageKey = '@todos'
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [deadlineValue, setDeadlineValue] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    const readTodos = async () => {
      try {
        const jsonTodos = await AsyncStorage.getItem(todosStorageKey)
        setTodos(jsonTodos !== null ? JSON.parse(jsonTodos) : [])
      } catch (e) {
        Alert.alert('An error occured while reading todos', `${e}`, [
          { text: 'OK' }
        ])
      }
    }
    readTodos().then()
  }, [])

  useEffect(() => {
    const storeTodos = async () => {
      try {
        const jsonTodos = JSON.stringify(todos)
        await AsyncStorage.setItem(todosStorageKey, jsonTodos)
      } catch (e) {
        Alert.alert('An error occured while storing todos', `${e}`, [
          { text: 'OK' }
        ])
      }
    }
    storeTodos().then()
  }, [todos])

  const appendTodos = () => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: nanoid(),
        text: inputValue.trim(),
        date: deadlineValue,
        done: false,
        editValue: null
      }
    ])
  }

  const handleAddButtonPress = () => {
    if (inputValue.trim() !== '') appendTodos()
    setInputValue('')
    setDeadlineValue(null)
    listRef.current.scrollToEnd({ animated: true })
  }

  const toggleDone = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const editTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, editValue: todo.text } : todo
      )
    )
  }

  const saveEditedTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              text: todo.editValue.trim() === '' ? todo.text : todo.editValue,
              editValue: todo.editValue.trim() === '' ? todo.editValue : null
            }
          : todo
      )
    )
  }

  const cancelEditedTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, editValue: null } : todo
      )
    )
  }

  const changeTodoEditValue = (id, value) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, editValue: value } : todo
      )
    )
  }

  const updateDeadlineValue = (e, date) => {
    if (e.type === 'dismissed') setDeadlineValue(null)
    else if (e.type === 'set') setDeadlineValue(date)
  }

  const todoElements = todos.map(todo => (
    <TodoItem
      {...todo}
      key={todo.id}
      onPress={() => toggleDone(todo.id)}
      onDeleteButtonPress={() => deleteTodo(todo.id)}
      onEditButtonPress={() => editTodo(todo.id)}
      onSaveButtonPress={() => saveEditedTodo(todo.id)}
      onCancelButtonPress={() => cancelEditedTodo(todo.id)}
      onEditInputChange={value => changeTodoEditValue(todo.id, value)}
    />
  ))

  const progress = todos.filter(todo => todo.done).length / todos.length || 0

  const dynamicMarginBottomStyle = { marginBottom: todos.length === 0 ? 0 : 20 }

  return (
    <KeyboardAvoidingView style={style.toMakeSandwich}>
      <Text style={style.title}>My To-Do-Sandwich</Text>
      <ProgressBar progress={progress} />
      <View style={[style.todoList, dynamicMarginBottomStyle]}>
        <ScrollView ref={listRef} keyboardShouldPersistTaps={'handled'}>
          {todoElements}
        </ScrollView>
      </View>
      <InputSection
        onInputChange={setInputValue}
        onDeadlineChange={updateDeadlineValue}
        onAddButtonPress={handleAddButtonPress}
        inputValue={inputValue}
        deadlineValue={deadlineValue}
      />
    </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create({
  toMakeSandwich: {
    margin: 20,
    flex: 1
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
  },
  todoList: {
    flexShrink: 1,
    borderRadius: 10,
    overflow: 'hidden'
  }
})
