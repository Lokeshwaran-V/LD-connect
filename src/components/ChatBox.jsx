import { useEffect, useState } from "react";
import { socket } from "../socket";
import "../styles/chatBox.css"

function ChatBox({ roomId, name }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      console.log("🔥 RECEIVED EVENT:", data);

      setMessages((prev) => [...prev, data]);
    };

    // remove all previous listeners
    socket.off("receive_message");

    // add fresh listener
    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    console.log("📤 Sending:", message);

    socket.emit("send_message", {
      roomId,
      message,
      name,
    });

    setMessage("");
  };

  return (
    <div>
      <h3>Chat</h3>

      <div
        style={{
          border: "1px solid black",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.name}</strong>: {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-event">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
