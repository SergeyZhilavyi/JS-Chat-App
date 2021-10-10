#  JS Chat App 
### Данное приложение обладает следующим функционалом:
1. Отправка сообщений;
2. Удаление сообщений отправителем;
3. Хранение сообщений в локальной базе данных в формате JSON;
4. Хранение имени и идентификатора пользователя в локальном хранилище браузера (local storage);
5. Отображение количества активных пользователей;
6. Отображение списка пользователей с онлайн-индикатором;
7. Возможность выбора и отправки эмодзи.

### Стек технологий
##### Общие: 
- Concurrently; 
- Nanoid.
##### Сервер: 
- LowDB; 
- Socket.io; 
- Supervisor.
##### Клиент:
- React;
- ReactDOM; 
- React Router DOM;
- Socket.io Client; 
- Bootstrap & React Bootstrap;
- Styled Components;
- Emoji Mart;
- React Icons;
- React Timeago.

### Запуск приложения

- Для начала необходимо установить зависимости     
Общие зависимости. Находясь в корневой папке проекта выполнить:  
yarn install или npm i.  
Зависимости client: cd client. Затем: yarn install или npm i.  
Зависимости server: cd .. ; cd server. Затем: yarn install или npm i.

- Выполнить команду, находясь в корневой директории проекта: yarn start или npm start

