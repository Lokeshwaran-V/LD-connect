import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import ChatBox from "../components/ChatBox";
import VideoPlayer from "../components/VideoPlayer";
import YouTubeSection from "../components/YouTubeSection";
import "../styles/room.css";

function Room() {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name || "Anonymous";
  const roomType = location.state?.roomType;
  const roomTitle = location.state?.roomTitle || "Room";
  const maxUsers = location.state?.maxUsers || 0;

  const hasJoined = useRef(false);
  const [videoId, setVideoId] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 🔌 Ensure socket connection
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("🔌 Socket connecting...");
    }
  }, []);

  // 👥 Join room safely + user events
  useEffect(() => {
    const handleUserJoined = (data) => {
      console.log("👤 New user joined:", data);
    };

    socket.off("user_joined");
    socket.on("user_joined", handleUserJoined);

    const joinRoom = () => {
      if (!hasJoined.current) {
        console.log("🚪 Joining room:", id);
        socket.emit("join_room", {
          roomId: id,
          name,
          roomType,
          maxUsers,
        });
        hasJoined.current = true;
      }
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on("connect", joinRoom);
    }

    return () => {
      socket.off("user_joined", handleUserJoined);
      socket.off("connect", joinRoom);
    };
  }, [id, name, roomType, maxUsers]);

  useEffect(() => {
    const handleRoomFull = () => {
      alert("🚫 Room is full");
      navigate("/home");
    };
    socket.on("room_full", handleRoomFull);
    return () => {
      socket.off("room_full", handleRoomFull);
    };
  }, [navigate]);

  useEffect(() => {
    const handleUsersUpdated = (updatedUsers) => {
      console.log("user updated: ", updatedUsers);
      setUsers(updatedUsers);
    };
    socket.on("users_updated", handleUsersUpdated);
    return () => {
      socket.off("users_updated", handleUsersUpdated);
    };
  }, []);

  const handleLeaveRoom = () => {
    socket.disconnect();
    navigate("/");
  };

  // 🎬 Video sync listener
  useEffect(() => {
    const handleVideoUpdate = ({ videoId }) => {
      console.log("🎬 Video received:", videoId);
      setVideoId(videoId);
    };

    socket.off("video_update");
    socket.on("video_update", handleVideoUpdate);

    return () => {
      socket.off("video_update", handleVideoUpdate);
    };
  }, []);

  return (
    <div className="room-container">
      {/* Header */}
      <div className="header">
        <div className="content">
          <h2>Room Id: {id}</h2>
          <h3>
            Users: ({users.length} / {maxUsers})
          </h3>
        </div>
      </div>
      <div className="room-info">
        <h2>{roomTitle} Room</h2>
        <p>Max Users: {maxUsers}</p>
      </div>

      {/* Song List */}
      <div className="song-list active">
        <YouTubeSection onSelectVideo={setVideoId} roomId={id} />
      </div>

      {/* Main Layout */}
      <div className="main">
        {/* Users */}
        <div className="users">
          <h3>Users</h3>
          {users.map((user) => (
            <div key={user.id} className="user-item">
              🟢 {user.name}
            </div>
          ))}
        </div>

        {/* Center - Video */}
        <div className="center">
          <VideoPlayer videoId={videoId} roomId={id} />
        </div>

        {/* Chat */}
        <div className="chat">
          <ChatBox roomId={id} name={name} />
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button>🎥 Video</button>
        <button>🎤 Audio</button>
        <button onClick={handleLeaveRoom}>🚪 Leave</button>
      </div>
    </div>
  );
}

export default Room;
