import React from "react";

function UserPanel({users, title="Couple"}) {
  return (
    <>
      {/* Users */}
      <div className="users">
        <h3>{title}</h3>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <p>🟢 {user.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPanel;
