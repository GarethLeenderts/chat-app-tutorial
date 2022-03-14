const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');


require('dotenv').config();

const app = express();

// Cors middleware
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

// Run when client connects
io.on('connection', socket => {
    console.log('New web socket connection...');
});



const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));