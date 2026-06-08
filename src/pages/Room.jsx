import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { socket } from "../socket";
import ChatBox from "../components/ChatBox";
import VideoPlayer from "../components/VideoPlayer";
import YouTubeSection from "../components/YouTubeSection";
import "../styles/room.css";

function Room() {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name || "Anonymous";

  const hasJoined = useRef(false);
  const [videoId, setVideoId] = useState(null);

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
        socket.emit("join_room", { roomId: id, name });
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
  }, [id, name]);

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
          <h2>User: {name}</h2>
          <h2>Room Id: {id}</h2>
        </div>
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
        <button>🚪 Leave</button>
      </div>
    </div>
  );
}

export default Room;