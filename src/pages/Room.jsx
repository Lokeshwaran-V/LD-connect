import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import ChatBox from "../components/ChatBox";
import VideoPlayer from "../components/VideoPlayer";
import YouTubeSection from "../components/YouTubeSection";
import "../styles/room.css";
import RoomHeader from "../components/RoomHeader";
import UserPanel from "../components/UserPanel";
import RoomControl from "../components/RoomControl";
import CoupleLayout from "../components/layouts/CoupleLayout";
import GangLayout from "../components/layouts/GangLayout";
// import { rooms } from "../data/rooms";

function Room() {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name || "Anonymous";
  const roomType = location.state?.roomType;
  const roomTitle = location.state?.roomTitle || "Room";
  const maxUsers = location.state?.maxUsers || 0;
  const roomIcon = location.state?.roomIcon;

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
          roomIcon,
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
  }, [id, name, roomType, maxUsers, roomIcon]);

  useEffect(() => {
    const handleRoomFull = () => {
      alert("🚫 Room is full");
      navigate("/");
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
  }, [users]);

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
      <CoupleLayout
        roomId={id}
        roomTitle={roomTitle}
        maxUsers={maxUsers}
        users={users}
        name={name}
        videoId={videoId}
        setVideoId={setVideoId}
        roomIcon={roomIcon}
      />

      {/* <GangLayout
        roomId={id}
        roomTitle={roomTitle}
        maxUsers={maxUsers}
        users={users}
        name={name}
        videoId={videoId}
        setVideoId={setVideoId}
      /> */}
    </div>
  );
}

export default Room;
