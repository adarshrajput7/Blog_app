import mongoose, { Schema } from 'mongoose'


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photoUrl: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    bio: { type: String, default: "" },
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel