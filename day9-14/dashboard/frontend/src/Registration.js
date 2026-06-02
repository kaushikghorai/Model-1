import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Register Form</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <p style={{ color: "red" }}>{error}</p>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
