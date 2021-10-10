// ------------------ Основной хук этого приложения
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import { useLocalStorage, useBeforeUnload } from 'hooks'

// Указываем адрес сервера
const SERVER_URL = 'http://localhost:5000'


export const useChat = (roomId) => {
  // Локальное состояние для пользователей
  const [users, setUsers] = useState([])
  // Локальное состояние для сообщений
  const [messages, setMessages] = useState([])

  // Создаем и записываем в локальное хранинище идентификатор пользователя
  const [userId] = useLocalStorage('userId', nanoid(8))
  // Получаем из локального хранилища имя пользователя
  const [username] = useLocalStorage('username')

  const socketRef = useRef(null)

  useEffect(() => {
    // Создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты 
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })

    // Выполняем  отправку события добавления пользователя
    socketRef.current.emit('user:add', { username, userId })

    // Обрабатываем получение списка пользователей
    socketRef.current.on('users', (users) => {
      // Обновляем массив пользователей
      setUsers(users)
    })

    // Выполняем отправку запроса на получение сообщений
    socketRef.current.emit('message:get')

    // Обрабатываем получение сообщений
    socketRef.current.on('messages', (messages) => {

      // Определяем, какие сообщения были отправлены данным пользователем
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      )
      // Обновляем массив сообщений
      setMessages(newMessages)
    })

    return () => {
      // При размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])


  // Реализация функции отправки сообщения
  const sendMessage = ({ messageText, senderName }) => {
    // Добавляем в объект id пользователя при отправке на сервер
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName
    })
  }

  // Реализация функции удаления сообщения по id
  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  // Выполняем отправку на сервер события "user:leave" перед перезагрузкой страницы
  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })

  
  return { users, messages, sendMessage, removeMessage }
}