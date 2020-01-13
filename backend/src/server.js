const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

//websocket
const socketio = require("socket.io");
const http = require("http");

const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};
//websocket

mongoose.connect(
  "mongodb+srv://tester:tester123@gregorispielmann-kkcp0.mongodb.net/aircnc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;

  socket.emit("hello", "World");
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "../uploads")));
app.use(routes);

server.listen(3333);
