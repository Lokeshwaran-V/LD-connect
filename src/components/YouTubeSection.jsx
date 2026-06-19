import { useState } from "react";
import { socket } from "../socket";
import "../styles/youtube-section.css";

function YouTubeSection({ onSelectVideo, roomId }) {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  // const currentTime = player.getCurrentTime();

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const searchVideos = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=5&type=video`,
      );

      const data = await res.json();

      if (data.error) {
        console.error("YouTube API error:", data.error);
        return;
      }

      setVideos(data.items);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleVideoSelect = (videoId) => {
    console.log("📤 Emitting video:", videoId);

    // update local UI immediately
    onSelectVideo(videoId);

    // sync to others (NO delay)
    socket.emit("video_select", {
      roomId,
      videoId,
    });
  };

  return (
    <div className="search-main">
      <div className="search-input">
        <input
          placeholder="Search YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchVideos()}
        />

        <button onClick={searchVideos}>Search</button>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-track">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              onClick={() => handleVideoSelect(video.id.videoId)}
              style={{
                cursor: "pointer",
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                style={{ minwidth: "100%" }}
              />
              <p style={{ fontSize: "13px" }}>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YouTubeSection;
