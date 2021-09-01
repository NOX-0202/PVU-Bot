const express = require('express')
const http = require('http');
const { Server } = require("socket.io");

var app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');    

});

app.get('/get-link/:link', (req, res) => {  
    io.emit('link', { link: req.params.link }); // This will emit the event to all connected sockets
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('link', (msg) => {
        io.emit('link', msg);
      });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



server.listen(3000, () => {
    console.log('listening on *:3000');
});
