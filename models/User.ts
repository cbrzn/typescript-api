import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    identifier: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

const UserModel = model('User', UserSchema)

export default UserModel