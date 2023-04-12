import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { colors } from './colors'
import { nanoid } from 'nanoid'
import TodoItem from './TodoItem'

export default function ToMakeSandwich() {
  const [todos, setTodos] = useState([
    {
      id: '0',
      text: 'Uika 1',
      date: Date.now(),
      done: false,
      editValue: null
    },
    {
      id: '1',
      text: 'Uika 2',
      date: null,
      done: false,
      editValue: null
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [deadlineValue, setDeadlineValue] = useState('')

  const appendTodos = () => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: nanoid(),
        text: inputValue,
        date: deadlineValue !== '' ? new Date(deadlineValue).getTime() : null,
        done: false,
        editValue: null
      }
    ])
  }

  const handleAddButtonClick = () => {
    if (inputValue.trim().length !== 0) appendTodos()
    setInputValue('')
    setDeadlineValue('')
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
              text:
                todo.editValue.trim().length === 0 ? todo.text : todo.editValue,
              editValue:
                todo.editValue.trim().length === 0 ? todo.editValue : null
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
    <View style={style.toMakeSandwich}>
      <Text style={style.title}>My To-Do-Sandwich</Text>
      <ProgressBar progress={progress} />
      <View style={[style.todoList, dynamicMarginBottomStyle]}>
        {todoElements}
      </View>
      <TextInput />
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
  },
  todoList: {
    borderRadius: 10,
    overflow: 'hidden'
  }
})
