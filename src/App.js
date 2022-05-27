import React, {useReducer, useState} from 'react'
import Todo from './components/Todo.js'
import './App.css';

export const ACTIONS = {
  ADD_TODO: 'addTodo',
  TOGGLE_CHECK:'toggleCheck',
  DELETE_TODO: 'deleteTodo'
}
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: 
    console.log("action", action)
    console.log("todos", todos)
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
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type: ACTIONS.ADD_TODO, payload: {name: name}})
    setName('')
  }
  return (
    <>
    <main className="container">
      <h1>TO DO LIST</h1>
    {todos.map((todo)=>
      <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
    )}
    <form onSubmit={handleSubmit}>
      <input 
      className="todoinput"
      type="text" value={name} 
      onChange={e => setName(e.target.value)}/>
    </form>
    </main>
    </>
  );
}

export default App;
