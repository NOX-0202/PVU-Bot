const express = require('express')
const { dirname } = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var activeLink = ''

app.use(express.json())

app.get('/', (req, res) => {   
    res.sendFile(__dirname + '/index.html');
})

app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/socket.io.js')
})

app.get('/getLink/:link', (req, res) => {   
    activeLink = req.params.link
    io.sockets.emit("link", activeLink)
    res.json({'ok': true})
})

io.on('connection', (socket) => {
    console.log(`a user connected => ${socket.id}`);
    
    socket.on('link', msg => {
        console.log('openning link => ', msg)
        socket.broadcast.emit('link', { link: msg })
    })
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })

});

server.listen(process.env.PORT || 4567)
