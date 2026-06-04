import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Show_users.css";

function Show_users({ onUserDeleted }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5500/show");
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Unable to fetch users list. Please make sure the Express backend server is running on port 5500.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query))
    );
  });

  const handleDelete = (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this user?")) {
      setDeletingId(id); // Trigger exit animation
      
      setTimeout(async () => {
        try {
          const response = await axios.delete(`http://localhost:5500/users/${id}`);
          if (response.status === 200) {
            setUsers((prev) => prev.filter((user) => user._id !== id));
            if (typeof onUserDeleted === "function") {
              onUserDeleted();
            }
          }
        } catch (err) {
          console.error("Error deleting user:", err);
          alert("Failed to delete user: " + (err.response?.data?.error || err.message));
        } finally {
          setDeletingId(null);
        }
      }, 300); // Wait for transition animation
    }
  };

  return (
    <div className="users-container">
      <h2>Registered Users Directory</h2>

      {/* Directory Search Controls */}
      <div className="users-filter-bar" style={{ marginBottom: "20px" }}>
        <div className="users-search-wrapper" style={{ display: "flex", alignItems: "center", maxWidth: "360px", background: "var(--bg-tertiary)", border: "1px solid var(--card-border)", borderRadius: "8px", padding: "8px 12px" }}>
          <svg viewBox="0 0 24 24" className="search-icon" style={{ width: "16px", height: "16px", marginRight: "8px", stroke: "var(--text-muted)", strokeWidth: 2, fill: "none" }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: "14px", width: "100%" }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="users-message">Loading directory content...</div>
      ) : error ? (
        <div className="users-error-box" style={{ padding: "12px", background: "var(--danger-glow)", color: "var(--danger)", border: "1px solid rgba(244, 63, 94, 0.15)", borderRadius: "8px" }}>{error}</div>
      ) : filteredUsers.length === 0 ? (
        <div className="users-empty-box" style={{ padding: "40px", textAlign: "center", border: "1px solid var(--card-border)", borderRadius: "var(--border-radius)", color: "var(--text-secondary)" }}>
          {searchTerm ? "No matching users found." : "No users currently registered."}
        </div>
      ) : (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Profile &amp; Name</th>
                <th>Email Address</th>
                <th>Status</th>
                <th style={{ width: "120px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const initials = user.name
                  ? user.name
                      .trim()
                      .split(/\s+/)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "U";

                return (
                  <tr
                    key={user._id}
                    className={deletingId === user._id ? "row-deleting" : ""}
                  >
                    <td>
                      <div className="user-profile-cell">
                        <div className="user-profile-avatar">{initials}</div>
                        <div>
                          <div className="user-profile-name">{user.name}</div>
                          <div className="user-profile-id">ID: {user._id || "Pending"}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="user-email-text">{user.email}</span>
                    </td>
                    <td>
                      <span className="user-status-tag">
                        <span className="status-dot"></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                          className="user-btn-delete"
                          onClick={() => handleDelete(user._id)}
                          title="Delete User"
                        >
                          <svg viewBox="0 0 24 24" className="btn-icon">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Show_users;
