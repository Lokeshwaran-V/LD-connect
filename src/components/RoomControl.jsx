import React from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

function RoomControl() {
  const navigate = useNavigate();
  const handleVideoControl = () => {
    console.log("video button clicked");
  };
  const handleAudioControl = () => {
    console.log("Audio button clicked");
  };
  const handleLeaveRoom = () => {
    socket.disconnect();
    navigate("/");
  };
  return (
    <>
      {/* Controls */}
      <div className="controls">
        {/* <VideoPlayer videoId={videoId} roomId={roomId} /> */}
        <button onClick={handleVideoControl}>🎥 Video</button>
        <button onClick={handleAudioControl}>🎤 Audio</button>
        <button onClick={handleLeaveRoom}>🚪 Leave</button>
      </div>
    </>
  );
}

export default RoomControl;
