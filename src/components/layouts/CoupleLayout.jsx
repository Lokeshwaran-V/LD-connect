import RoomHeader from "../RoomHeader";
import UserPanel from "../UserPanel";
import YouTubeSection from "../YouTubeSection";
import VideoPlayer from "../VideoPlayer";
import RoomControl from "../RoomControl";
import ChatBox from "../ChatBox";

function CoupleLayout({
  roomId,
  roomTitle,
  maxUsers,
  users,
  videoId,
  setVideoId,
  name,
  onLeave,
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
        <RoomControl onLeave={onLeave} />
      </div>

      <YouTubeSection onSelectVideo={setVideoId} roomId={roomId} />

      <ChatBox roomId={roomId} name={name} />
    </>
  );
}

export default CoupleLayout;
