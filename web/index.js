const express = require('express')
const http = require('http').Server(app)
const { Server } = require("socket.io");

var app = express()
const io = new Server(http)

app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');    

});

app.get('/get-link/:link', (req, res) => {  
    io.emit('link', () =>  { link: req.params.link }); // This will emit the event to all connected sockets
});

io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('link', msg => {
        io.emit('link', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
});



http.listen(3000, () => {
    console.log('listening on *:3000');
});
