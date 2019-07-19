import UserService from './users.service'
import App from '../app'
import * as request from 'supertest'
import UserController from './users.controller'
import * as mongoose from 'mongoose';

const app = new App([
    new UserController()
]);

describe('User service', () => {
    const userService = new UserService()
    it('getting user information', () => {
        userService.getUserInformation(1).then(result => {
            expect(result).toMatchObject({ status: 200 })
        })
    })

    it('getting user avatar', () => {
        userService.getAvatar(1).then(result => {
            expect(result).toMatchObject({ status: 200 })
        })
    })

    it('getting user information', () => {
        userService.deleteUser(1).then(result => {
            expect(result).toMatchObject({ status: 200 })
        })
    })
})

// describe('User controller', () => {
    
//     it('Testing get user', async () => {
//         const response = await request(app.getServer())
//         .get(`/api/user/2/avatar`)
//         expect(response.body).toMatchObject({status: 200})
//     })
//     afterAll(() => mongoose.connection.close())
// })

