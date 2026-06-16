import React from "react";

function UserPanel({users, title="Couple"}) {
  // console.log("UserPanel users:", users);
  return (
    <>
      {/* Users */}
      <div className="users">
        <h3>Users</h3>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            🟢 {user.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPanel;
