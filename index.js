const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

// Constants
const FE_URLS = [
    "http://localhost:3000", 
    "http://localhost:3001",
    "http://localhost:3002",
    "https://develop--survival-quiz-game.netlify.app",
    "https://survival-quiz-game.netlify.app"]
const WS_PORT = 3005
const GAME_TOPIC = "game_status_topic"

// Init Server
const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: FE_URLS,
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
