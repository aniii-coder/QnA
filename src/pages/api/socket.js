import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  res.end();
}
