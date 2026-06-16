import RoomHeader from "../RoomHeader";
import UserPanel from "../UserPanel";
import YouTubeSection from "../YouTubeSection";
import VideoPlayer from "../VideoPlayer";
import RoomControl from "../RoomControl";
import ChatBox from "../ChatBox";
// import "../../styles/couple-layout.css"

function CoupleLayout({
  roomId,
  roomTitle,
  maxUsers,
  users,
  videoId,
  setVideoId,
  name,
}) {
  return (
    <>
      <RoomHeader
        roomTitle={roomTitle}
        roomId={roomId}
        usersCount={users.length}
        maxUsers={maxUsers}
      />

      <div className="couple-main">
        <UserPanel users={users} title="💕 Together" />

        <VideoPlayer videoId={videoId} roomId={roomId} />
      </div>

      <div className="controller">
        <RoomControl />
      </div>

      <div className="couple-playlist">
        <YouTubeSection onSelectVideo={setVideoId} roomId={roomId} />
      </div>

      <div className="couple-chat">
        <ChatBox roomId={roomId} name={name} />
      </div>
    </>
  );
}

export default CoupleLayout;
