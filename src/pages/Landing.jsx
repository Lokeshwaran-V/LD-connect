import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import { rooms } from "../data/rooms.js";

function Landing() {
  const navigate = useNavigate();

  const handleSelect = (room) => {
    navigate("/home", {
      state: {
        roomType: room.id,
        roomTitle: room.title,
        maxUsers: room.maxUsers,
        roomIcon: room.icon,
      },
    });
  };

  return (
    <div className="landing-container">
      <h1>🌎 Long Distance Connect</h1>

      <p>Choose your experience</p>

      <div className="card-grid">
        {rooms.map((room) => (
          <div key={room.id} className="option-card" onClick={() => handleSelect(room)}>
            <img src={room.image} alt={room.title} />
            
            <h2>{room.title} {room.icon}</h2>
            <p>
              {room.description}
            </p><br />
            <p>{room.maxUsers} Members</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
