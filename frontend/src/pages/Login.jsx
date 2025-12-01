import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/todo");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <button className="secondary-btn" onClick={() => navigate("/register")}>
        Create Account
      </button>
    </div>
  );
}

export default Login;
