import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express(); //so we can use express here. so we can call the app in the index.js
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

// used to store online users
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId; //to get the online users
    if (userId) userSocketMap[userId] = (socket.id);

    //io.emit() is used to broadcast events to connected clients.
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId]; //to delete when they go offline
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
}); //this is to listen to events

export {io, app, server}; //this logic is basically for the real time function of socket.io