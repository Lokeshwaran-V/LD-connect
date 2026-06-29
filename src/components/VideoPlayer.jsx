import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import "../styles/video-player.css";

function VideoPlayer({ videoId, roomId }) {
  const playerRef = useRef(null);
  const isSyncing = useRef(false);
  const playerReady = useRef(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Load YouTube API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Create player
  useEffect(() => {
    if (!videoId) return;
    setShowOverlay(true);

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("player", {
        videoId: videoId,

        playerVars: {
          enablejsapi: 1,
          origin: "http://localhost:5173",
        },

        events: {
          onReady: () => {
            playerReady.current = true;
          },

          onStateChange: (event) => {
            if (!playerReady.current) return;
            if (isSyncing.current) return;
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [videoId]);

  // 🔥 SYNC LISTENERS (only react, never emit)
  useEffect(() => {
    const handlePlay = () => {
      console.log("📥 PLAY received");

      if (!playerReady.current) return;
      setShowOverlay(false);

      isSyncing.current = true;
      playerRef.current?.playVideo();

      setTimeout(() => {
        isSyncing.current = false;
      }, 600);
    };

    const handlePause = () => {
      console.log("📥 PAUSE received");

      if (!playerReady.current) return;

      isSyncing.current = true;
      playerRef.current?.pauseVideo();

      setTimeout(() => {
        isSyncing.current = false;
      }, 600);
    };

    socket.on("video_play", handlePlay);
    socket.on("video_pause", handlePause);

    return () => {
      socket.off("video_play", handlePlay);
      socket.off("video_pause", handlePause);
    };
  }, []);

  // 🔥 LOCAL CONTROL (user actions)
  const handlePlayClick = () => {
    if (!playerReady.current) return;

    console.log("🎬 USER PLAY");

    isSyncing.current = true;
    playerRef.current?.playVideo();

    socket.emit("video_play", { roomId });

    setTimeout(() => {
      isSyncing.current = false;
    }, 500);
  };

  const handleOverlayPlay = () => {
    if (!playerReady.current) return;

    setShowOverlay(false);

    console.log("▶ Overlay Play");

    isSyncing.current = true;

    playerRef.current?.playVideo();

    socket.emit("video_play", { roomId });

    setTimeout(() => {
      isSyncing.current = false;
    }, 500);
  };

  const handlePauseClick = () => {
    if (!playerReady.current) return;

    console.log("⏸ USER PAUSE");

    isSyncing.current = true;
    playerRef.current?.pauseVideo();

    socket.emit("video_pause", { roomId });

    setTimeout(() => {
      isSyncing.current = false;
    }, 500);
  };

  return (
    <>
      <div className="video-wrapper">
        <div id="player"></div>

        {showOverlay && (
          <div className="video-overlay" onClick={handleOverlayPlay}>
            <div className="overlay-content">
              <h2>🎬</h2>
              <h3>Ready to Watch</h3>
              {/* <p>Start Together</p> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VideoPlayer;
