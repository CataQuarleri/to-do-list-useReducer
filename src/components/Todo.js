import React from 'react';
import {ACTIONS} from '../App.js'
function Todo({todo, dispatch}) {
    console.log("todo en comp", todo)
    return (
       <ul>
           <li className="li-item">
     <button className="btn-check" onClick={()=> dispatch({type: ACTIONS.TOGGLE_CHECK, payload: {id: todo.id} })}>{todo.complete ? "v" : ""}</button>
        <span style={{textDecoration: todo.complete ? 'line-through' : 'none'}}>{todo.name}</span>
        <button className="btn-delete" onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id} })}>X</button>
           </li>
       </ul>
    );
}

export default Todo;