import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      if (response.data.success) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }

    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={handleRegister}>Register</button>
      <button className="secondary-btn" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
}

export default Register;
