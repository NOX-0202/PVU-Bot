const express = require('express')
const { dirname } = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var cors = require('cors')
var activeLink = ''

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {   
    res.sendFile(__dirname + '/index.html');
})

app.get('/getLink/:link', async (req, res) => {   
    activeLink = req.params.link
    await io.emit("link", activeLink)
    res.send(`abrindo o link ${activeLink}`)
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
