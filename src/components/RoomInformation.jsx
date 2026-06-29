import "../styles/room-information.css"

function RoomHeader({ roomId, roomTitle, maxUsers, usersCount, roomIcon }) {
  return (
    <header className="room-header">
      <div className="room-header__container">
        <h1 className="room-header__title">
          {roomIcon} {roomTitle} Room
        </h1>

        <div className="room-header__info">
          <h4 className="room-header__room-id">Room ID: {roomId}</h4>

          <p className="room-header__max-users">Max Users: {maxUsers}</p>

          <p className="room-header__users">
            Users: {usersCount} / {maxUsers}
          </p>
        </div>
      </div>
    </header>
  );
}

export default RoomHeader;
