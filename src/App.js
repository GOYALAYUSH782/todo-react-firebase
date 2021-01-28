import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from "./firebase";
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => (
        {
          todo: doc.data().todo,
          id: doc.id
        }
      )))
    })
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([
    //   ...todos,
    //   input
    // ])
    setInput('');
  };

  return (
    <div className="App">
      <h1>Faster Todo APP React / Firebase </h1>
      <form>
        {/* <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        /> */}
        <FormControl>
          <InputLabel > Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          {/* <FormHelperText >We'll never share your email.</FormHelperText> */}
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>Add Todo</ button> */}
      </form>
      <ul>
        {todos.map(todo => <Todo todo={todo} />)}
      </ul>
    </div>
  );
}

export default App;
