const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const events = require('events')
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants')
const timeUpEvent = new events.EventEmitter()
io.on('connection', (socket) => {
  console.log("someone connected!")
})
app.use(express.static('public'))
http.listen(3000, () => {
  console.log('listening on *:3000')
})
const questions = [{
  text: "what is 1 + 1?",
  time: 5,
  answers: [
    "1",
    "2",
    "3",
    "4"
  ],
  correctAnswer: "2"
}, ]
const socket = io()
socket.emit('connected')
socket.once("name", (name) => {
  userPointMap[socket.id] = [name, 0]
  io.emit("name", name)
})
let loader = document.createElement("div")
loader.classList.add("loader")
socket.on('connected', async _ => {
    const name = await swal("your name:", {
        content: "input",
        button: "join",
        closeOnClickOutside: false,
        closeOnEsc: false
    })
    socket.emit("name", name)
    swal({
        title: "loading...",
        content: loader,
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false
    })
})
let userPointMap = {
}
