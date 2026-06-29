import React, { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

function RoomControl() {
  const [isMute, setIsMute] = useState("Speak");
  const navigate = useNavigate();

  const handleVideoControl = () => {
    console.log("video button clicked");
  };

  const handleAudioControl = () => {
    if (isMute === "Speak" ? setIsMute("Mute") : setIsMute("Speak"));
    console.log("Audio clicked");
  };

  const handleLeaveRoom = () => {
    socket.disconnect();
    navigate("/");
  };
  return (
    <>
      {/* Controls */}
      <div className="controls">
        <button onClick={handleVideoControl}>🎥 Video</button>
        <button onClick={handleAudioControl}>🎤 {isMute}</button>
        <button onClick={handleLeaveRoom}>🚪 Leave</button>
      </div>
    </>
  );
}

export default RoomControl;
