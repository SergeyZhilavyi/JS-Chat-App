import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Picker } from 'emoji-mart'
import { FiSend } from 'react-icons/fi'
import { GrEmoji } from 'react-icons/gr'

// Компонент принимает имя пользователя и функцию отправки сообщений
export const MessageForm = ({ username, sendMessage }) => {
  // Локальное состояние для текста сообщения
  const [text, setText] = useState('')
  // Индикатор отображения эмодзи
  const [showEmoji, setShowEmoji] = useState(false)

  // Обрабатываем изменение текста
  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  // Обрабатываем показ/скрытие эмодзи
  const handleEmojiShow = () => {
    setShowEmoji((v) => !v)
  }

  // Обрабатываем выбор эмодзи
  // добавляем его к тексту, используя предыдущее значение состояния текста
  const handleEmojiSelect = (e) => {
    setText((text) => (text += e.native))
  }

  // Обрабатываем отправку сообщения
  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      sendMessage({ messageText: text, senderName: username })
      setText('')
    }
  }

  return (
    <>
      <Form onSubmit={handleSendMessage}>
        <Form.Group className='d-flex'>
          <Button variant='primary' type='button' onClick={handleEmojiShow}>
            <GrEmoji />
          </Button>
          <Form.Control
            value={text}
            onChange={handleChangeText}
            type='text'
            placeholder='Message...'
          />
          <Button variant='success' type='submit'>
            <FiSend />
          </Button>
        </Form.Group>
      </Form>
      {/* эмодзи */}
      {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
    </>
  )
}