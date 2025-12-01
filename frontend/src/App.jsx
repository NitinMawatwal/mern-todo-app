import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
