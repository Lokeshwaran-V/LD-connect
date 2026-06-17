import React from "react";

function RoomHeader({ roomId, roomTitle, maxUsers, usersCount, roomIcon }) {
  return (
    <>
      <div className="header">
        <div className="content">
          <h1>
            {roomIcon} {roomTitle} Room
          </h1>
          <div className="room-info">
            <h4>Room Id: {roomId}</h4>
            <p>Max Users: {maxUsers}</p>
            <p>
              Users: {usersCount} / {maxUsers}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomHeader;
