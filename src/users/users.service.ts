import * as express from 'express'
import User from './users.interface'
import UserModel from '../models/User'
import * as rp from 'request-promise'
import { base64 } from 'base64-img'
import * as path from 'path'
import * as fs from 'fs'

class UserService {

    private user: User = {
        avatar: '',
        identifier: 0
    };

    public getUserInformation = (userId) => {
      return new Promise(async (resolve, reject) => {
            const result = await rp.get(`https://reqres.in/api/users/${userId}`)
            resolve({ status: 200, result })
        })
    }
     
    public getAvatar = (userId) => {   
        return new Promise(async(resolve, reject) => {
            const user = await UserModel.findOne({ identifier: userId })
            if (user) {
                resolve({ status: 200, user })
            } else {
                rp.get(`https://reqres.in/api/users/${userId}`).then(result => {
                    const userInformation = JSON.parse(result)
                    const file = path.join(__dirname, '../../images', `/image_user_${userInformation.data.id}.jpg`)
                    fs.writeFileSync(file, userInformation.data.avatar)
                    base64(file, async (err, data) => {
                        if (err) reject({ status: 500, error: err })
                        this.user.avatar = data;
                        this.user.identifier = userInformation.data.id
                        await new UserModel(this.user).save()
                        resolve({ status: 200, data })
                    })
                }).catch(error => {
                    console.log(error)
                    reject({status: 500, error})
                })
            }
        })
    }
    
    public deleteUser = async (userId) => {
        return new Promise(async(resolve, reject) => {
            try {
                const file = path.join(__dirname, '../../images', `/image_user_${userId}.jpg`)
                fs.unlinkSync(file)
                await UserModel.deleteOne({ identifier: userId })
                resolve({ status: 200 })
            } catch (e) {
                console.log(e)
                reject({ status: 500 })
            }
        })
    }
}    

export default UserService;