import { useNavigate } from "react-router-dom";
import { rooms } from "../data/rooms";
import "../styles/landing.css";

function Landing() {
  // Navigation
  const navigate = useNavigate();

  // Handlers
  const handleSelectRoom = ({
    id,
    title,
    maxUsers,
    icon,
  }) => {
    navigate("/home", {
      state: {
        roomType: id,
        roomTitle: title,
        maxUsers,
        roomIcon: icon,
      },
    });
  };

  return (
    <main className="landing">
      <section className="landing__hero">
        <h1 className="landing__title">
          🌎 Long Distance Connect
        </h1>

        <p className="landing__subtitle">
          Choose your experience
        </p>
      </section>

      <section className="landing__grid">
        {rooms.map((room) => (
          <article
            key={room.id}
            className={`landing__card landing__card--${room.id}`}
            onClick={() => handleSelectRoom(room)}
          >
            <img
              className="landing__image"
              src={room.image}
              alt={room.title}
            />

            <h2 className="landing__card-title">
              {room.icon} {room.title}
            </h2>

            <p className="landing__description">
              {room.description}
            </p>

            <p className="landing__members">
              {room.maxUsers} Members
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Landing;