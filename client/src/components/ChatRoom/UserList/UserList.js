import { Accordion, Card, Button, Badge } from 'react-bootstrap'
import { RiRadioButtonLine } from 'react-icons/ri'

// Компонент принимает объект с пользователями 
export const UserList = ({ users }) => {
  // Преобразуем его в массив
  const usersArr = Object.entries(users)
  // получаем массив вида (массив подмассивов)
  // [ ['1', { username: 'Katy', online: false }], ['2', {username: 'Jeff', online: false}] ]

  // Количество активных пользователей
  const activeUsers = Object.values(users)
    // Получаем массив вида
    // [ {username: 'Katy', online: false}, {username: 'Jeff', online: false} ]
    .filter((u) => u.online).length

  return (
    <Accordion className='mt-4'>
      <Card>
        <Card.Header bg='none'>
          <Accordion.Toggle
            as={Button}
            variant='info'
            eventKey='0'
            style={{ textDecoration: 'none' }}
          >
            Active users{' '}
            <Badge variant='light' className='ml-1'>
              {activeUsers}
            </Badge>
          </Accordion.Toggle>
        </Card.Header>
        {usersArr.map(([userId, obj]) => (
          <Accordion.Collapse eventKey='0' key={userId}>
            <Card.Body>
              <RiRadioButtonLine
                className={`mb-1 ${
                  obj.online ? 'text-success' : 'text-secondary'
                }`}
                size='0.8em'
              />{' '}
              {obj.username}
            </Card.Body>
          </Accordion.Collapse>
        ))}
      </Card>
    </Accordion>
  )
}