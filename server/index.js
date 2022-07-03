const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`Người dùng đã kết nối: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`Người dùng: ${socket.id} đã vào phòng: ${data}`)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  })

  socket.on('disconnect', () => {
    console.log('Người dùng ngắt kết nối', socket.id)
  })
})

server.listen(3001, () => {
  console.log('Server đang chạy!!!')
})
