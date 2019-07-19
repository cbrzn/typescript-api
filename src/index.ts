import App from './app';
import UserController from './users'

const server = new App([
    new UserController()
])

server.listen()