// Имитируем БД
const users = {
    1: { username: 'Katy', online: false },
    2: { username: 'Jeff', online: false }
  }
  
  module.exports = (io, socket) => {
    // Выполняем обработку запроса на получение пользователей
    const getUsers = () => {
      io.in(socket.roomId).emit('users', users)
    }
  
    // Обрабатываем возможность добавления пользователя
    // функция принимает объект с именем пользователя и его id
    const addUser = ({ username, userId }) => {
      // Проверяем, имеется ли пользователь в БД
      if (!users[userId]) {
        // Если не имеется, добавляем его в БД
        users[userId] = { username, online: true }
      } else {
        // Если имеется, меняем его статус на онлайн
        users[userId].online = true
      }
      // Выполняем запрос на получение пользователей
      getUsers()
    }
  
    // Обрабатываем возможность удаления пользователя
    const removeUser = (userId) => {
      users[userId].online = false
      getUsers()
    }
  
    // Регистрируем обработчики
    socket.on('user:get', getUsers)
    socket.on('user:add', addUser)
    socket.on('user:leave', removeUser)
  }