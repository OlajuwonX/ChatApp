import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express(); //so we can use express here. so we can call the app in the index.js
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
}); //this is to listen to events

export {io, app, server}; //this logic is basically for the real time function of socket.io