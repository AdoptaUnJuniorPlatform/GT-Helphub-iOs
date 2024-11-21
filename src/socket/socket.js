import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4002";

let socket;

export const initializeSocket = async (userData) => {
  const user_id = userData._id;

  socket = io(SOCKET_SERVER_URL, {
    query: { id: user_id },
    timeout: 5000,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error(
      "Socket has not been initialized. Call initializeSocket first.",
    );
  }
  return socket;
};
