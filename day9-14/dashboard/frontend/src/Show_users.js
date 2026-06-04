import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Show_users.css";

function Show_users() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5500/show")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return (
    <div>
      <h2>Users List</h2>

      <tabel><tr><th>Name</th><th>Email</th></tr>
        {
          users.map((user) => (
            <tr>
              <td>{user.name}</td><td> {user.email}</td>
            </tr>
          ))
        }
      </tabel>
    </div>
  );
}

export default Show_users;
