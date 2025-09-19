import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import postsRouter from "./routes/posts.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// API route for posts
app.use("/posts", postsRouter);

// Socket.io chat
io.on("connection", (socket) => {
  console.log("✅ Użytkownik połączony:", socket.id);

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Użytkownik rozłączony:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Backend GlobalChat.pl działa na http://localhost:${PORT}`);
});
