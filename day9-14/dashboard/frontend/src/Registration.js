import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setError("All fields are required");
    } else {
      try {
        setError("");
        const response = await axios.post("http://localhost:5500/signup", {
          name,
          email,
          password,
        });

        // Backend returns 201 Created on successful registration
        if (response.status === 201 || response.status === 200) {
          alert("Registration Successful");
          navigate("/");
        } else {
          setError("Registration failed");
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Unable to connect to the backend server. Please verify it is running on port 5500.");
        }
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register Form</h2>

        <div className="register-form-group">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="register-form-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="register-form-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
        </div>

        {error && <p className="register-error">{error}</p>}

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
