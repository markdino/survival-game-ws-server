const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

// Constants
const FE_URL = "http://localhost:3001"
const WS_PORT = 3001
const GAME_TOPIC = "game_status_topic"

// Init Server
const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: FE_URL,
        methods: ["GET", "POST"]
    },
})


// Init Websocket Server
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on(GAME_TOPIC, (data) => {
        socket.broadcast.emit(GAME_TOPIC, data)
        console.log(data)
    })
})


// Run Server
server.listen(WS_PORT, () => {
    console.log(`Websocket Server running on port: ${WS_PORT}`)
})