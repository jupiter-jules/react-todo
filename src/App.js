import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from 'react-bootstrap/ListGroup';

import './App.css';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Write down everything you need to do", done: false },
    { id: 2, text: "Break daunting tasks into manageable pieces", done: false },
    { id: 3, text: "Keep it short and simple", done: false }
  ]);

const openTodos = (
  todos.filter(item => item.done === false));

const openTodosCount = openTodos.length;

  return (
    <div>
      <Container>  
      <div class="py-5 text-center">
        <h1>          
        <span style={{
            color: "#d54513",
            marginRight: "10px",
          }}>{openTodosCount}</span>
        Tasks <span style={{
            fontWeight: "200",
          }}>to go</span></h1>
        <p class="lead">"Nothing is particularly hard if you break it down into small jobs."</p>
      </div>   
      <TodoList setTodos={setTodos} todos={todos} />
      <AddTodo setTodos={setTodos} />
      </Container>
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul
    style={{
      marginLeft: "-2em"
    }}
    >
      {todos.map((todo) => (
        <ListGroup>
          <ListGroup.Item
          /* onDoubleClick={() => handleToggleTodo(todo)}*/
          style={{
            textDecoration: todo.done ? "line-through" : "",
            color: todo.done ? "grey" : ""
          }}
          key={todo.id}
        >
          <input type="checkbox" aria-label="Checkbox for following text input" name="done"
          onClick={() => handleToggleTodo(todo)}
          style={{
            marginRight: "1em"
          }}
          />
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
          </ListGroup.Item>
        </ListGroup>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <CloseButton
      onClick={handleDeleteTodo}
      style={{
        float: "right"
      }}
    >
    </CloseButton>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
        <InputGroup className="mb-3">
        <Form.Control
          ref={inputRef} name="addTodo" 
          placeholder="Add Task"
          aria-label="Add todo"
          aria-describedby="basic-addon2"
        />
        <Button type="submit"variant="primary" id="button-addon2">Submit</Button>
      </InputGroup>
    </form>
  );
}
