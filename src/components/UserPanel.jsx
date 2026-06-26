import React from "react";
import "../styles/user-panel.css";

function UserPanel({ users, title = "Couple" }) {
  return (
    <div className="users">
      <h3>{title}</h3>
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <p>🟢 {user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPanel;
