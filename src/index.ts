import App from './app';
import UserController from './users/users.controller'

const server = new App([
    new UserController()
])

server.listen()