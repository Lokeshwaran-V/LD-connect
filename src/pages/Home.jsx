import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const roomType = location.state?.roomType;
  const roomTitle = location.state?.roomTitle;
  const maxUsers = location.state?.maxUsers;
  const roomIcon = location.state?.roomIcon;

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${newRoomId}`, {
      state: {
        name,
        roomType,
        roomTitle,
        maxUsers,
        roomIcon,
      },
    });
  };

  const joinRoom = () => {
    if (!roomId) return;
    navigate(`/room/${roomId}`, {
      state: {
        name,
        roomType,
        roomTitle,
        maxUsers,
        roomIcon,
      },
    });
  };

  return (
    <div className="home-container">
      <div className="overlay"></div>

      <div className="home-card">
        <h1 className="title">💜 LD Connect</h1>

        <p className="subtitle">
          Stay connected. Watch together. Chat together.
        </p>
        <h2 className="room-type">
          {roomTitle} Room - {maxUsers} Users
        </h2>

        <input
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="create-btn" onClick={createRoom}>
          ✨ Create Room
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <input
          className="input"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button className="join-btn" onClick={joinRoom}>
          🚀 Join Room
        </button>
      </div>
    </div>
  );
}

export default Home;
