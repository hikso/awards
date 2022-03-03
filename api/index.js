const express = require('express');

const path = require('path');
require('dotenv').config();

//Express app
const app = express();

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {cors: {origins: '*:*'}});
require('./sockets/sockets');

const publicPath = path.resolve(__dirname, 'public');

server.listen(process.env.PORT, (err) => {
    
    app.use(express.static(publicPath));

    if (err) throw err;
    console.log('Server is running on port', process.env.PORT);
});