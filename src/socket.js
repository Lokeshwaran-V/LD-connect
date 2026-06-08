import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
});

// Debug logs (optional but useful)
socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});