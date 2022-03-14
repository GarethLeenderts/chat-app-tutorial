const express = require('express');
const http = require('http');


require('dotenv').config();

const app = express();

const server = http.createServer(app);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));