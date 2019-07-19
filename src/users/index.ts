import * as express from 'express'
import User from './users.interface'
import UserModel from '../models/User'
import * as rp from 'request-promise'
import { base64 } from 'base64-img'
import * as path from 'path'
import * as fs from 'fs'
import Controller from 'interfaces/controller.interface';

class UserController implements Controller {
    public path ="/user";
    public router = express.Router()

    private user: User = {
        avatar: '',
        identifier: 0
    };

    constructor() {
        this.intializeRoutes();
    }
     
    public intializeRoutes() {
        this.router.get(`${this.path}/:userId`, this.getUserInformacion);
        this.router.get(`${this.path}/:userId/avatar`, this.getAvatar);
        this.router.delete(`${this.path}/:userId/avatar`, this.deleteUser);
    }

    getUserInformacion = (request: express.Request, response: express.Response) => {
    rp.get(`https://reqres.in/api/users/${request.params.userId}`).then(result => {
        response.json({ status: 200, user: result.data });
    }).catch(error => {
        console.log(error)
        response.json({ status: 500, error });
    })
    }
     
    getAvatar = async (request: express.Request, response: express.Response) => {   
        const user = await UserModel.findOne({ identifier: request.params.userId })
        if (user) {
            response.json({ status: 200, user });
        } else {
            rp.get(`https://reqres.in/api/users/${request.params.userId}`).then(result => {
                const userInformation = JSON.parse(result)
                const file = path.join(__dirname, '../images', `/image_user_${userInformation.data.id}.jpg`)
                fs.writeFileSync(file, userInformation.data.avatar)
                base64(file, async (err, data) => {
                    if (err) return response.json({ status: 500, error: err })
                    this.user.avatar = data;
                    this.user.identifier = userInformation.data.id
                    await new UserModel(this.user).save()
                    response.json({ status: 200, avatar_added: data})
                })
            }).catch(error => {
                console.log(error)
                response.json({ status: 500, error });
            })
        }
    }

      deleteUser = async (request: express.Request, response: express.Response) => {
        try {
            const file = path.join(__dirname, '../images', `/image_user_${request.params.userId}.jpg`)
            fs.unlink(file, err => {
                if (err) console.log(err)
            })
            await UserModel.deleteOne({ identifier: request.params.userId })
            response.json({ status: 200 })
        } catch (e) {
            console.log(e)
            response.json({ status: 200 })
        }
      }

}

export default UserController;