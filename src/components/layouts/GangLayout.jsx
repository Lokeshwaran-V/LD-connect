import RoomHeader from "../RoomHeader";
import YouTubeSection from "../YouTubeSection";
import UserPanel from "../UserPanel";
import VideoPlayer from "../VideoPlayer";
import RoomControl from "../RoomControl";
import ChatBox from "../ChatBox";

function GangLayout({
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
      <div className="gang-main">
        <UserPanel users={users} title="😎 Gang" />

        <RoomControl  videoId={videoId} roomId={roomId} />
      </div>

      <div className="controller">
        
      </div>

      <YouTubeSection onSelectVideo={setVideoId} roomId={roomId} />

      <ChatBox roomId={roomId} name={name} />
    </>
  );
}

export default GangLayout;
