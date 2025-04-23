import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./ChatRoom.css"; // Make sure this file contains the professional styles

const socket = io("http://localhost:5000"); // Backend URL

const ChatRoom = ({ roomId }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      console.log("[Frontend] Emitting join-room with ID:", roomId);
      socket.emit("join-room", roomId);
    }

    socket.on("receive-message", (data) => {
      console.log("[Frontend] Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      console.log("[Frontend] Cleaning up socket listener");
      socket.off("receive-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (msg.trim()) {
      console.log("[Frontend] Sending message:", msg);
      socket.emit("send-message", msg);
      setMsg("");
    } else {
      console.log("[Frontend] Empty message, not sent");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Room: {roomId}</div>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className="chat-message">
            <strong>{m.sender}</strong>: {m.message}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
