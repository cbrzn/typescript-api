import UserService from './users.service'

describe('User service', () => {
    const userService = new UserService()
    it('getting user information', () => {
        userService.getUserInformation(1).then(result => {
            expect(result).toBe({})
        })
    })

    it('getting user avatar', () => {
        userService.getAvatar(1).then(result => {
            expect(result).toBe({})
        })
    })

    it('getting user information', () => {
        userService.deleteUser(1).then(result => {
            expect(result).toBe({})
        })
    })
})

// after(() => mongoose.connection.close())
