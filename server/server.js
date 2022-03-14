const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');


require('dotenv').config();

const app = express();

// Cors middleware
app.use(cors());

const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: { 
        origin: "http://localhost/5000",
        methods: ["GET", "POST"],
    }
});

// Run when client connects
io.on("connection", (socket) => {
    console.log('New web socket connection...', socket.id);

    io.on("disconnect", () => {
        console.log("User has disconnected", socket.id);
    })
});



const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));