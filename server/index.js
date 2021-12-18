const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection",function(socket)
{
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room",function(data)
    {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room with id: ${data}`);
    });

    socket.on("send_message",function(data)
    {
        socket.to(data.room).emit("receive_message",data);
       // console.log(data);
    });
    socket.on("disconnect",function()
    {
        console.log("User disconnected", socket.id);
    });
});

server.listen(3001,function()
{
    console.log("server running on 3001");
});