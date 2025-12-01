import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const navigate = useNavigate();

  // ------------------ GET TODOS ------------------
  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/todo/all",
        { headers: { Authorization: token } }
      );

      if (response.data.success) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.log(error);
      alert("Session expired. Login again.");
      navigate("/login");
    }
  };

  // ------------------ ADD TODO ------------------
  const addTodo = async () => {
    try {
      if (!title.trim()) return alert("Enter a todo");

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/todo/add",
        { title },
        { headers: { Authorization: token } }
      );

      setTitle("");
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ DELETE TODO ------------------
  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/todo/delete/${id}`,
        { headers: { Authorization: token } }
      );

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ TOGGLE COMPLETE ------------------
  const toggleTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/todo/toggle/${id}`,
        {},
        { headers: { Authorization: token } }
      );

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ EDIT TODO ------------------
  const updateTodo = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/todo/edit/${editingId}`,
        { title: editingText },
        { headers: { Authorization: token } }
      );

      setEditingId(null);
      setEditingText("");
      getTodos();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todo-box">
      <h2>Your Todos</h2>

      {/* Add Todo */}
      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <hr />

      {/* Todo List */}
      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">

          {/* If editing */}
          {editingId === todo._id ? (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button onClick={updateTodo}>Save</button>
              <button
                className="secondary-btn"
                onClick={() => {
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>

              <div className="todo-buttons">
                <button onClick={() => toggleTodo(todo._id)}>
                  {todo.completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => {
                    setEditingId(todo._id);
                    setEditingText(todo.title);
                  }}
                >
                  Edit
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Logout */}
      <button
        className="secondary-btn"
        style={{ marginTop: "20px" }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Todo;
