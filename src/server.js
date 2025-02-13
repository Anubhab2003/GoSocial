const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let activeUsers = [];

io.on('connection', (socket) => {
  // Add user to active users list
  socket.on('addUser', (userId) => {
    activeUsers.push({ userId, socketId: socket.id });
    io.emit('getUsers', activeUsers);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit('getUsers', activeUsers);
  });

  // Handle sending and receiving messages
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      });
    }
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
