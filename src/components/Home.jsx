import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Home.css"; // Make sure this file contains the professional styles

const Home = ({ setRoomId }) => {
  const [input, setInput] = useState("");

  const createRoom = () => {
    const newRoom = uuidv4().slice(0, 6); // shorter room code
    setRoomId(newRoom);
  };

  const joinRoom = () => {
    if (input.trim()) setRoomId(input.trim());
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h2>Welcome to Chat App</h2>
        <p>Join or create a room to start chatting with others instantly.</p>
        <button className="cta-button" onClick={createRoom}>
          Create Room
        </button>

        <div className="room-code-area">
          <input
            className="room-input"
            placeholder="Enter Room Code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="cta-button" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
