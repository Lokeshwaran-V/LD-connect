import React from "react";

function RoomHeader({roomId, roomTitle, maxUsers, usersCount}) {
  return (
    <>
      <div className="header">
        <div className="content">
          <h2>Room Id: {roomId}</h2>
          <h3>
            Users: ({usersCount} / {maxUsers})
          </h3>
        </div>
      </div>
      <div className="room-info">
        <h2>{roomTitle} Room</h2>
        <p>Max Users: {maxUsers}</p>
      </div>
    </>
  );
}

export default RoomHeader;
