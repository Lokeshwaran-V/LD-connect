import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  // Navigation
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  // Route Data
  const roomType = location.state?.roomType;
  const roomTitle = location.state?.roomTitle;
  const maxUsers = location.state?.maxUsers;
  const roomIcon = location.state?.roomIcon;

  // Shared Navigation State
  const navigationState = {
    name: name.trim(),
    roomType,
    roomTitle,
    maxUsers,
    roomIcon,
  };

  // Handlers
  const createRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const newRoomId = Math.random().toString(36).substring(2, 8);

    navigate(`/room/${newRoomId}`, {
      state: navigationState,
    });
  };

  const joinRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!roomId.trim()) {
      alert("Please enter a Room ID.");
      return;
    }

    navigate(`/room/${roomId.trim()}`, {
      state: navigationState,
    });
  };

  return (
    <main className="home">
      <div className="home__overlay"></div>

      <section className="home__card">
        <h1 className="home__title">💜 LD Connect</h1>

        <p className="home__subtitle">
          Stay connected. Watch together. Chat together.
        </p>

        <h2 className="home__room">
          {roomIcon} {roomTitle} Room
        </h2>

        <p className="home__capacity">{maxUsers} Members</p>

        <input
          className="home__input"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="home__button home__button--create"
          onClick={createRoom}
        >
          ✨ Create Room
        </button>

        <div className="home__divider">
          <span>OR</span>
        </div>

        <input
          className="home__input"
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button className="home__button home__button--join" onClick={joinRoom}>
          🚀 Join Room
        </button>
      </section>
    </main>
  );
}

export default Home;
