// --------------- Главный файл нашего сервера

const server = require('http').createServer()
// Подключаем к серверу Socket.IO
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const log = console.log

// Получаем обработчики событий
const registerMessageHandlers = require('./handlers/messageHandler')
const registerUserHandlers = require('./handlers/userHandler')

// Эта функция будет выполняться при подключении каждого сокета
const Connection = (socket) => {
  
  log('User connected')

  // Получаем название комнаты 
  const { roomId } = socket.handshake.query
  // Выполняем сохранение названия комнаты в соответствующем свойстве сокета
  socket.roomId = roomId

  // Заходим в комнату
  socket.join(roomId)

  // Регистрируем обработчики
  registerMessageHandlers(io, socket)
  registerUserHandlers(io, socket)

  // Обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    log('User disconnected')
    // Выходим из комнаты
    socket.leave(roomId)
  })
}

// Выполняем обработку подключения
io.on('connection', Connection)

// Выполняем запуск сервера
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`The server is ready to work. Port: ${PORT} ...`)
})
