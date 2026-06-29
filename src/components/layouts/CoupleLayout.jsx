import RoomHeader from "../RoomInformation";
import UserPanel from "../UserPanel";
import YouTubeSection from "../YouTubeSection";
import VideoPlayer from "../VideoPlayer";
import RoomControl from "../RoomControl";
import ChatBox from "../ChatBox";
import "../../styles/couple-layout.css";

function CoupleLayout({
  roomId,
  roomTitle,
  maxUsers,
  users,
  videoId,
  setVideoId,
  name,
  roomIcon,
}) {
  return (
    <>
      <RoomHeader
        roomTitle={roomTitle}
        roomId={roomId}
        usersCount={users.length}
        maxUsers={maxUsers}
        roomIcon={roomIcon}
      />

      <div className="couple-playlist">
        <YouTubeSection onSelectVideo={setVideoId} roomId={roomId} />
      </div>

      <div className="couple-main">
        <div className="video-users">
          <UserPanel users={users} title="💕 Together" />

          <VideoPlayer videoId={videoId} roomId={roomId} />
        </div>
      </div>

      <div className="controller">
        <RoomControl />
      </div>

      <div className="couple-chat">
        <ChatBox roomId={roomId} name={name} />
      </div>
    </>
  );
}

export default CoupleLayout;
