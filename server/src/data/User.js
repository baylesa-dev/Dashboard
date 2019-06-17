import { model, Schema } from 'mongoose'
import { generateRandomString } from '../utils'

export const UserSchema = new Schema({
    createdAd: Number,
    username: String,
    auth: {
        password: String,
        twitter: {
            token: String,
            secret: String
        }
    },
    token: String,
    admin: Boolean,
})

UserSchema.pre('save', function(next) {
    const user = this

    if (!user.createdAt) {
        user.createdAt = Date.now()
    }

    if (!user.token) {
        user.token = generateRandomString(90)
    }
    next()
})

export const UserModel = model(
    'User',
    UserSchema
)

export default UserModel