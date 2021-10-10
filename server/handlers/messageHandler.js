const { nanoid } = require('nanoid')
// настраиваем БД
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
// БД хранится в директории "db" под названием "messages.json"
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

// Выполняем запись в БД данных по-умолчанию
db.defaults({
  messages: [
    {
      messageId: '1',
      userId: '1',
      senderName: 'Jeff',
      messageText: 'What are you doing now?',
      createdAt: '2021-10-06'
    },
    {
      messageId: '2',
      userId: '2',
      senderName: 'Katy',
      messageText: 'I listen to music. The guys released a cool album!',
      createdAt: '2021-10-07'
    }
  ]
}).write()

module.exports = (io, socket) => {
  // Выполняем обработку запроса на получение сообщений
  const getMessages = () => {
    // Получаем данные из БД
    const messages = db.get('messages').value()
    // Передаем сообщения пользователям, которые находятся в комнате
    io.in(socket.roomId).emit('messages', messages)
  }

  // Обрабатываем возможность добавление сообщения
  // Функция принимает , в качестве параметра, объект сообщения
  const addMessage = (message) => {
    db.get('messages')
      .push({
        // Генерируем идентификатор с помощью библиотеки nanoid, 8 - это длина id
        messageId: nanoid(8),
        createdAt: new Date(),
        ...message
      })
      .write()

    // Выполняем запрос на получение сообщений
    getMessages()
  }

  // Обрабатываем возможность удаления сообщения
  // Функция принимает id сообщения
  const removeMessage = (messageId) => {
    db.get('messages').remove({ messageId }).write()

    getMessages()
  }

  // Регистрируем обработчики
  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
  socket.on('message:remove', removeMessage)
}
