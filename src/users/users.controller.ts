import * as express from 'express'
import Controller from 'interfaces/controller.interface';
import UserService from './users.service'

class UserController implements Controller {
    public path ="/user";
    public router = express.Router()
    public userService = new UserService()

    constructor() {
        this.initalizeRoutes();
    }

    public initalizeRoutes() {
        this.router.get(`${this.path}/:userId`, this.sendUserInformation);
        this.router.get(`${this.path}/:userId/avatar`, this.sendAvatar);
        this.router.delete(`${this.path}/:userId/avatar`, this.dropUser);
    }

    private sendUserInformation = (request: express.Request, response: express.Response) => {
        this.userService.getUserInformation(request.params.userId).then((result: any) => {
            response.send(result)
        }).catch(error => {
            response.send(error)
        })
    }

    private sendAvatar = (request: express.Request, response: express.Response) => {
        this.userService.getAvatar(request.params.userId).then((result: any) => {
            response.send(result)  
        }).catch(error => {
            response.send(error)  
        })
    }

    private dropUser = (request: express.Request, response: express.Response) => {
        this.userService.deleteUser(request.params.userId).then((result: any) => {
            response.send(result)  
        }).catch(error => {
            response.send(error)
        })
    }
}

export default UserController;