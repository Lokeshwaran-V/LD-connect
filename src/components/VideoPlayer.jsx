import { useEffect, useRef } from "react";
import { socket } from "../socket";

function VideoPlayer({ videoId, roomId }) {
  const playerRef = useRef(null);
  const isSyncing = useRef(false);
  const playerReady = useRef(false);
  // const lastSeekTime = useRef(0);
  // const isSeeking = useRef(false);

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

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("player", {
        height: "300",
        width: "100%",
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

            // 🔥 Detect SEEK using timestamp change
            // const currentTime = playerRef.current?.getCurrentTime();
            // const now = Date.now();

            // if (Math.abs(currentTime - lastSeekTime.current) > 2) {
            //   if (now - lastSeekTime.current > 1000) {
            //     console.log("⏩ USER SEEK:", currentTime);

            //     lastSeekTime.current = now;

            //     socket.emit("video_seek", {
            //       roomId,
            //       time: currentTime,
            //     });
            //   }
            // }
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

    // const handleSeek = ({ time }) => {
    //   console.log("📥 SEEK received:", time);

    //   if (!playerReady.current) return;

    //   isSyncing.current = true;

    //   playerRef.current?.seekTo(time, true);

    //   setTimeout(() => {
    //     isSyncing.current = false;
    //   }, 800);
    // };

    socket.on("video_play", handlePlay);
    socket.on("video_pause", handlePause);
    // socket.on("video_seek", handleSeek);

    return () => {
      socket.off("video_play", handlePlay);
      socket.off("video_pause", handlePause);
      // socket.off("video_seek", handleSeek);
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
    <div>
      <div id="player"></div>

      {/* 🔥 Custom Controls */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePlayClick}>▶️ Play</button>
        <button onClick={handlePauseClick}>⏸ Pause</button>
      </div>
    </div>
  );
}

export default VideoPlayer;
