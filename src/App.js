import React, {useReducer, useState, useEffect, useRef } from 'react'
import Todo from './components/Todo.js'
import './App.css';

export const ACTIONS = {
  ADD_TODO: 'addTodo',
  TOGGLE_CHECK:'toggleCheck',
  DELETE_TODO: 'deleteTodo'
}

const savedTodos = JSON.parse(localStorage.getItem('toDos'))

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: 
    return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_CHECK: 
    return todos.map(todo => {
      if(todo.id === action.payload.id){
        return {...todo, complete: !todo.complete }
      }
      return todo
    });
    case ACTIONS.DELETE_TODO: 
    return todos.filter(todo => todo.id !== action.payload.id);
    default: throw new Error('error')
  }
}

function newTodo(name){
  return {id: Date.now(), name: name, complete: false}
}

function App() {
  const [todos, dispatch] = useReducer(reducer, savedTodos || [])
  // const [name, setName] = useState('')
  const name = useRef("") 
console.log("render")

  useEffect(()=>{
     localStorage.setItem('toDos', JSON.stringify(todos))
     }, [todos])

  function handleSubmit(e){
    e.preventDefault()
    name.current = e.target[0]?.value
    dispatch({type: ACTIONS.ADD_TODO, payload: {name: name.current}})
    e.target[0].value = ""
  }
  return (
    <>
    <main className="container">
      <h1>TO DO LIST</h1>
      <ul>
    {todos.map((todo)=>
      <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
    )}
      </ul>
    <form onSubmit={handleSubmit}>
      <input ref={name}
      className="todoinput"
      type="text" 
      />
    </form>
    </main>
    </>
  );
}

export default App;
